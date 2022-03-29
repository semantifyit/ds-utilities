import { DsGrammarNodeTypeV7, DsV7 } from "../../types/DsGrammarV7.type";
import { SDOAdapter } from "schema-org-adapter";
import { getDsRootNode } from "./getDsRootNode.fn";
import { deepEqual } from "../../../base/helper/helper";

import { dsGrammarNodeTypes as GNT } from "../../data/dsGrammar.data";
import { dsPathGetNode } from "../path/dsPathGetNode.fn";
import { DsNodeGeneric } from "../../../base/types/DsGrammarGeneric.type";

/**
 * Returns the grammar-type of the given DS-Node within the given [Populated Domain Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#3.5.-ds-hierarchy).
 *
 * It is possible to pass an [SDO-Adapter](https://www.npmjs.com/package/schema-org-adapter) to tell a standard enumeration apart from a standard class. If no SDO-Adapter is given, a standard class is assumed.
 *
 * If a reference node is passed and the parameter `followReference` is set to `true`, then the grammar type of the referenced node is returned (e.g. internal reference that points to a Restricted Class -> `RestrictedClass`) instead of the type of the reference node itself.
 *
 * The possible DS-Grammar Node types are listed in the documentation of {@link PathTokenObjectV7 | PathTokenObjectV7}.
 *
 * @example
 * ```JS
 * const nodeDsGrammarType = myDsUtilitiesV7.identifyDsGrammarNodeType(exampleNode, exampleDs, true);
 * // "RestrictedClass" - assume 'exampleNode' is a Restricted Class Node
 * ```
 *
 * @param dsNode - the input DS Node
 * @param ds  - the input DS (populated)
 * @param followReference - if true, the type of the referenced node is returned, instead of the type of the reference
 * @param sdoAdapter {SDOAdapter?} - A SDO-Adapter instance (already initialized with the wished vocabularies)
 * @return {string} the type of the given node
 */
export function identifyDsGrammarNodeType(
  dsNode: DsNodeGeneric,
  ds: DsV7,
  followReference: boolean,
  sdoAdapter?: SDOAdapter
): DsGrammarNodeTypeV7 {
  const rootNode = getDsRootNode(ds);
  // check if it is @context
  const contextNode = dsPathGetNode(ds, "@context");
  if (deepEqual(dsNode, contextNode)) {
    return GNT.context;
  }
  // check if it is the DS root node (is also a restricted class, but we have an own identifier for the root node)
  if (deepEqual(dsNode, rootNode)) {
    return GNT.root;
  }
  // property
  if (dsNode["@type"] === "sh:PropertyShape") {
    return GNT.property;
  }
  // datatype
  if (dsNode["sh:datatype"]) {
    return GNT.dataType;
  }
  // class or enumeration
  if (dsNode["@type"] === "sh:NodeShape") {
    // restricted class
    if (dsNode["sh:property"]) {
      return GNT.classRestricted;
    }
    // restricted enumeration
    if (dsNode["sh:in"]) {
      return GNT.enumerationRestricted;
    }
    if (dsNode["sh:class"].length === 1 && sdoAdapter) {
      try {
        sdoAdapter.getEnumeration(dsNode["sh:class"][0]);
        return GNT.enumerationStandard;
      } catch (e) {
        // not an enumeration
        return GNT.classStandard;
      }
    } else {
      // if no sdo adapter is given, then a standard class is expected
      return GNT.classStandard;
    }
  }
  // reference or enumeration member
  if (dsNode["@id"]) {
    // node reference
    const match = ds["@graph"].find((el) => {
      return dsNode["@id"] === el["@id"];
    });
    if (match) {
      if (followReference) {
        // let this function check the referenced object
        return identifyDsGrammarNodeType(
          match,
          ds,
          followReference,
          sdoAdapter
        );
      } else {
        // return type of reference itself
        if (rootNode["@id"] === match["@id"]) {
          return GNT.refRoot;
        } else if (match["@id"].startsWith(rootNode["@id"])) {
          return GNT.refInternal;
        } else if (match["@id"].includes("#")) {
          return GNT.refInternalExternal;
        } else {
          return GNT.refExternal;
        }
      }
    }
    // todo use sdo Adapter if available to ensure that it is an enumeration member?
    // else: assume it is an enumeration member
    return GNT.enumerationMember;
  }
  throw new Error("Could not find a match for the given DS Node.");
}
