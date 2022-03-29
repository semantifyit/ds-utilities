import { DsV7 } from "../../types/DsGrammarV7.type";
import { isObject, reorderNodeWithSchema } from "../../../base/helper/helper";
import { LanguageTaggedString } from "../../../base/types/LanguageTaggedString.type";
import { nodeSchemaLanguageTaggedString } from "../../../base/data/LanguageTaggedString.nodeSchema";
import { reorderDsNode } from "./reorderDsNode.fn";
import { DsNodeGeneric } from "../../../base/types/DsGrammarGeneric.type";
import { nodeSchemaDs } from "../../data/nodeSchemas/Ds.nodeSchema";
import { nodeSchemaContext } from "../../data/nodeSchemas/Context.nodeSchema";

/**
 * Reorders the attributes of all nodes of the given Domain Specification according to their order in the Key-Value tables in the [DsV7-Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification).
 *
 * @example
 * ```JS
 * myDsUtilitiesV7.reorderDs(exampleDs);
 * ```
 *
 * @param ds - the input Domain Specification
 */
export function reorderDs(ds: DsV7) {
  if (!isObject(ds)) {
    throw new Error("The given input was not an object, as required.");
  }
  // reorder DS object
  reorderNodeWithSchema(ds, nodeSchemaDs);
  // reorder context
  reorderNodeWithSchema(ds["@context"], nodeSchemaContext);
  // reorder graph nodes (root node + internal references)
  // root node should be the first in the @graph array
  const indexOfRootNode = ds["@graph"].findIndex(
    (el) => el["@type"] === "ds:DomainSpecification"
  );
  if (indexOfRootNode !== 0) {
    ds["@graph"] = [
      ds["@graph"][indexOfRootNode],
      ...ds["@graph"].slice(0, indexOfRootNode),
      ...ds["@graph"].slice(indexOfRootNode + 1),
    ];
  }
  for (const graphNode of ds["@graph"]) {
    reorderClassLikeNode(graphNode);
  }
}

function reorderClassLikeNode(classNode: DsNodeGeneric) {
  reorderDsNode(classNode);
  reorderMetaPropertyIfExists(classNode, "schema:name");
  reorderMetaPropertyIfExists(classNode, "schema:description");
  reorderMetaPropertyIfExists(classNode, "rdfs:label");
  reorderMetaPropertyIfExists(classNode, "rdfs:comment");
  if (classNode["sh:property"]) {
    for (const propertyNode of classNode["sh:property"]) {
      reorderPropertyNode(propertyNode);
    }
  }
}

function reorderPropertyNode(propertyNode: DsNodeGeneric) {
  reorderDsNode(propertyNode);
  reorderMetaPropertyIfExists(propertyNode, "rdfs:label");
  reorderMetaPropertyIfExists(propertyNode, "rdfs:comment");
  for (const rangeNode of propertyNode["sh:or"]) {
    reorderDsNode(rangeNode);
    reorderMetaPropertyIfExists(rangeNode, "rdfs:label");
    reorderMetaPropertyIfExists(rangeNode, "rdfs:comment");
    if (rangeNode["sh:node"]) {
      reorderClassLikeNode(rangeNode["sh:node"]);
    }
  }
}

function reorderMetaPropertyIfExists(dsNode: DsNodeGeneric, term: string) {
  if (dsNode[term]) {
    reorderMetaValues(dsNode[term]);
  }
}
// reorder the meta values (language-tagged strings) in a given array
function reorderMetaValues(valuesArray: LanguageTaggedString[]) {
  for (const valObj of valuesArray) {
    reorderNodeWithSchema(valObj, nodeSchemaLanguageTaggedString);
  }
}
