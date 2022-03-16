import {
  ClassNodeV7,
  DataTypeNodeV7,
  DsNodeV7,
  DsV7,
  EnumerationNodeV7,
  PropertyNodeV7,
  PropertyRangeNodeV7,
  PropertyRangeShNodeV7,
  RestrictedClassNodeV7,
  RootNodeV7,
} from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { DsNodeGeneric } from "../../../base/types/DsGrammarGeneric.type";

/**
 * Returns a node within the given DS based on the given ds-path. (reference)
 *
 * @param ds - The input DS
 * @param dsPath - The input ds-path
 * @param resolveReference  - If true, and the last token of the path is a reference node, then the referenced objected will be returned. Else the referencing object will be returned.
 * @return {object} - The node at the given ds-path (by reference)
 */
export function dsPathGetNode(
  ds: DsV7,
  dsPath: string,
  resolveReference = false
): DsNodeV7 {
  if (dsPath === "@context") {
    // special case for @context
    if (!ds["@context"]) {
      throw new Error(
        "The given DS has no @context, which is mandatory for a DS in DS-V7 format."
      );
    }
    return ds["@context"];
  } else if (dsPath.startsWith("$")) {
    // normal DS root
    const dsRoot = getDsRootNode(ds);
    if (dsPath === "$") {
      return dsRoot;
    } else {
      return getPropertyNode(
        dsRoot["sh:property"],
        dsPath.substring(2),
        ds,
        resolveReference
      );
    }
  } else {
    // could be:
    // Internal reference definition
    // External reference definition
    // Internal node of an External reference definition
    const pathTokens = dsPath.split(".");
    const referenceDefinition = ds["@graph"].find((el) =>
      el["@id"].endsWith(pathTokens[0])
    ) as DsNodeGeneric;
    if (!referenceDefinition) {
      throw new Error(
        "Could not find a fitting reference definition for path-token " +
          pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      return referenceDefinition;
    } else {
      return getPropertyNode(
        referenceDefinition["sh:property"],
        dsPath.substring(pathTokens[0].length + 1),
        ds,
        resolveReference
      );
    }
  }
}

// helper function to check if a given class combination array matches another class combination array
function checkClassMatch(arr1: string[], arr2: string[]) {
  return (
    !arr1.find((el) => !arr2.includes(el)) &&
    !arr2.find((el) => !arr1.includes(el))
  );
}

//  helper function - actDsObj is an array of ranges
function getRangeNode(
  actDsObj: PropertyRangeNodeV7[],
  actRestPath: string,
  ds: DsV7,
  resolveReference: boolean
): DsNodeGeneric {
  const rootNode = getDsRootNode(ds);
  const pathTokens = actRestPath.split(".");
  const rangeToken = pathTokens[0];
  let actRange: PropertyRangeNodeV7 | undefined;
  let referencedNode: RootNodeV7 | ClassNodeV7 | EnumerationNodeV7 | undefined;
  // reference node
  if (rangeToken.startsWith("@")) {
    if (rangeToken === "@$") {
      // root node reference
      actRange = (actDsObj as PropertyRangeShNodeV7[]).find(
        (el) => el["sh:node"] && el["sh:node"]["@id"] === rootNode["@id"]
      );
      referencedNode = rootNode;
    } else if (rangeToken.startsWith("@#")) {
      // internal node reference
      actRange = (actDsObj as PropertyRangeShNodeV7[]).find(
        (el) =>
          el["sh:node"] &&
          el["sh:node"]["@id"] === rootNode["@id"] + rangeToken.substring(1)
      );
      if (actRange) {
        referencedNode = ds["@graph"].find(
          (el) =>
            el["@id"] ===
            (actRange as PropertyRangeShNodeV7)?.["sh:node"]["@id"]
        );
      }
    } else {
      // external (internal) node reference
      actRange = (actDsObj as PropertyRangeShNodeV7[]).find(
        (el) =>
          el["sh:node"] &&
          el["sh:node"]["@id"].endsWith(rangeToken.substring(1))
      );
      if (actRange) {
        referencedNode = ds["@graph"].find(
          (el) =>
            el["@id"] ===
            (actRange as PropertyRangeShNodeV7)?.["sh:node"]["@id"]
        );
      }
    }
  } else {
    actRange = actDsObj.find(
      (el) =>
        (el as DataTypeNodeV7)["sh:datatype"] === pathTokens[0] ||
        ((el as PropertyRangeShNodeV7)["sh:node"] &&
          ((el as PropertyRangeShNodeV7)["sh:node"] as ClassNodeV7)[
            "sh:class"
          ] &&
          checkClassMatch(
            ((el as PropertyRangeShNodeV7)["sh:node"] as ClassNodeV7)[
              "sh:class"
            ],
            pathTokens[0].split(",")
          )) ||
        ((el as PropertyRangeShNodeV7)["sh:node"] &&
          (el as PropertyRangeShNodeV7)["sh:node"]["@id"].endsWith(
            pathTokens[0].substring(1)
          ))
    );
  }
  if (!actRange) {
    throw new Error(
      "Could not find a fitting range-node for path-token " + pathTokens[0]
    );
  }
  if (pathTokens.length === 1) {
    if (resolveReference && referencedNode) {
      return referencedNode;
    } else if ((actRange as PropertyRangeShNodeV7)["sh:node"]) {
      return (actRange as PropertyRangeShNodeV7)["sh:node"];
    } else {
      return actRange as DataTypeNodeV7;
    }
  } else {
    if (referencedNode) {
      return getPropertyNode(
        (referencedNode as RestrictedClassNodeV7)["sh:property"],
        actRestPath.substring(pathTokens[0].length + 1),
        ds,
        resolveReference
      );
    } else {
      return getPropertyNode(
        (
          (actRange as PropertyRangeShNodeV7)[
            "sh:node"
          ] as RestrictedClassNodeV7
        )["sh:property"],
        actRestPath.substring(pathTokens[0].length + 1),
        ds,
        resolveReference
      );
    }
  }
}

// helper function
function getPropertyNode(
  actDsObj: PropertyNodeV7[],
  actRestPath: string,
  ds: DsV7,
  resolveReference: boolean
): DsNodeGeneric {
  const pathTokens = actRestPath.split("/");
  const actProp = actDsObj.find((el) => el["sh:path"] === pathTokens[0]);
  if (!actProp) {
    throw new Error(
      "Could not find a fitting property-node for path-token " + pathTokens[0]
    );
  }
  if (pathTokens.length === 1) {
    return actProp;
  } else {
    // check next token -> range
    return getRangeNode(
      actProp["sh:or"],
      actRestPath.substring(pathTokens[0].length + 1),
      ds,
      resolveReference
    );
  }
}
