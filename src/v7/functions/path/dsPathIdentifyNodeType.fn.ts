import { DsNodeGeneric } from "../../../base/types/DsGrammarGeneric.type";
import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { dsPathGetNode } from "./dsPathGetNode.fn";
import { deepEqual } from "../../../base/helper/helper";
import { pathGrammarNodeTypes as PGN } from "../../data/pathGrammar.data";
import { PathGrammarNodeTypeV7 } from "../../types/PathGrammarV7.type";

/**
 * Returns the ds-path-type of the given DS Node within the given DS
 *
 * @param dsNode - the input DS Node
 * @param ds - the input DS
 * @return the ds-path-type of the given node
 */
export function dsPathIdentifyNodeType(dsNode: DsNodeGeneric, ds: DsV7): PathGrammarNodeTypeV7 {
  // todo add sdo adapter as optional parameter to identify standard enumerations
  const rootNode = getDsRootNode(ds);
  // check if it is @context
  const contextNode = dsPathGetNode(ds, "@context");
  if (deepEqual(dsNode, contextNode)) {
    return PGN.context;
  }

  if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
    // if there is only 1 attribute that is @id, then this is a reference node
    if (dsNode["@id"] === rootNode["@id"]) {
      return PGN.refRoot;
    } else if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return PGN.refInt;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return PGN.refIntExt;
    } else {
      return PGN.refExt;
    }
  }
  // nodes in @graph array
  if (dsNode["@type"] === "ds:DomainSpecification") {
    return PGN.root; // root node
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    ds["@graph"].find((el) => el["@id"] === dsNode["@id"]) !== undefined
  ) {
    // a reference definition
    if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return PGN.defInt;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return PGN.defIntExt;
    } else {
      return PGN.defExt;
    }
  }
  // other nodes
  if (dsNode["@type"] === "sh:PropertyShape") {
    return PGN.property;
  }
  if (dsNode["sh:datatype"] !== undefined) {
    return PGN.dataType;
  }
  if (dsNode["@type"] === "sh:NodeShape" && dsNode["sh:in"] !== undefined) {
    return PGN.enumeration;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:property"] !== undefined
  ) {
    return PGN.class;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:class"] !== undefined
  ) {
    // this could be a standard class or a standard enumeration, we can not tell for sure without SDO Adapter
    return PGN.class;
  }
  throw new Error("Could not identify a valid Path Grammar Node Type for the given input.");
}