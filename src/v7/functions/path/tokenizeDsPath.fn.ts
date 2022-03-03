import {
  ClassNodeV7,
  DataTypeNodeV7,
  DsV7,
  PropertyNodeV7,
} from "../../types/DsGrammarV7.type";
import { dsPathGetNode } from "./dsPathGetNode.fn";
import { identifyDsGrammarNodeType } from "../structure/identifyDsGrammarNodeType.fn";
import { dsPathIdentifyNodeType } from "./dsPathIdentifyNodeType.fn";
import { prettyPrintCompactedIRIs } from "../../../base/functions/prettyPrintCompactedIRIs.fn";
import { pathGrammarNodeTypes } from "../../data/pathGrammar.data";
import { getDataTypeLabel } from "../ui/getDataTypeLabel.fn";
import { PathTokenObjectV7 } from "../../types/PathGrammarV7.type";

/**
 * Returns an array of objects, representing the tokens of a given ds-path. (reference)
 * https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/dspath
 *
 * @param ds  - The input DS
 * @param dsPath  - The input ds-path
 * @return an Array of path-tokens based on the given input
 */
export function tokenizeDsPath(ds: DsV7, dsPath: string): PathTokenObjectV7[] {
  let currentPath = "";
  let restPath = dsPath;
  const result: PathTokenObjectV7[] = [];

  while (restPath !== "") {
    let currentToken;
    if (restPath === dsPath && restPath.startsWith("$")) {
      // root node
      currentToken = "$";
    } else if (restPath === dsPath && restPath.startsWith("@context")) {
      // context node
      currentToken = "@context";
    } else if (restPath === dsPath && restPath.startsWith("#")) {
      // Internal Reference Definition
      const limiter = restPath.indexOf(".");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else if (
      restPath === dsPath &&
      !dsPath.startsWith("#") &&
      !dsPath.startsWith("@") &&
      !dsPath.startsWith("$")
    ) {
      // External Reference Definition
      const limiter = restPath.indexOf(".");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else if (restPath.startsWith(".")) {
      // property
      const limiter = restPath.indexOf("/");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else if (restPath.startsWith("/")) {
      // root node reference
      // internal reference
      // external reference (without fragment part) or Internal node of external reference (has "#fragmentId" at the end)
      // class/enumeration, datatype
      const limiter = restPath.indexOf(".");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else {
      throw new Error(
        "Could not find a valid token match for '" + restPath + "'."
      );
    }
    currentPath = currentPath + currentToken;
    restPath = restPath.substring(currentToken.length);
    result.push(createDsPathToken(ds, currentToken, currentPath, restPath));
  }
  return result;
}

function createDsPathToken(
  ds: DsV7,
  token: string,
  currentPath: string,
  restPath: string
): PathTokenObjectV7 {
  const dsNodeResolvedReference = dsPathGetNode(ds, currentPath, true);
  const dsNodeUnresolvedReference = dsPathGetNode(ds, currentPath, false);
  const grammarNodeType = identifyDsGrammarNodeType(
    dsNodeResolvedReference,
    ds,
    true
  );
  const dsPathNodeType = dsPathIdentifyNodeType(dsNodeUnresolvedReference, ds);
  let label;
  if (token === "@context") {
    label = "@context";
  } else if (dsPathNodeType === pathGrammarNodeTypes.property) {
    label = prettyPrintCompactedIRIs(
      (dsNodeResolvedReference as PropertyNodeV7)["sh:path"]
    );
  } else if (dsPathNodeType === pathGrammarNodeTypes.dataType) {
    label = getDataTypeLabel(
      (dsNodeResolvedReference as DataTypeNodeV7)["sh:datatype"]
    );
  } else {
    // everything else
    label = prettyPrintCompactedIRIs(
      (dsNodeResolvedReference as ClassNodeV7)["sh:class"]
    );
  }
  return {
    token,
    label,
    grammarNodeType,
    dsPathNodeType,
    currentPath,
    restPath,
  };
}
