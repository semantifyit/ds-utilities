import { isObject, reorderNodeWithSchema } from "../../../base/helper/helper";
import { DsNodeGeneric } from "../../../base/types/DsGrammarGeneric.type";
import { nodeSchemaRoot } from "../../data/nodeSchemas/Root.nodeSchema";
import { nodeSchemaProperty } from "../../data/nodeSchemas/Property.nodeSchema";
import { nodeSchemaEnumeration } from "../../data/nodeSchemas/Enumeration.nodeSchema";
import { nodeSchemaClass } from "../../data/nodeSchemas/Class.nodeSchema";
import { nodeSchemaDs } from "../../data/nodeSchemas/Ds.nodeSchema";
import { nodeSchemaContext } from "../../data/nodeSchemas/Context.nodeSchema";
import { nodeSchemaDataType } from "../../data/nodeSchemas/DataType.nodeSchema";
import { nodeSchemaLanguageTaggedString } from "../../../base/data/LanguageTaggedString.nodeSchema";
import { nodeSchemaEnumerationMember } from "../../data/nodeSchemas/EnumerationMember.nodeSchema";

/**
 * Reorders the attributes of the given DS-Node according to their order in the Key-Value table in the [DsV7-Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification).
 *
 * The corresponding node type is detected automatically. Works only for certain ds grammar node types.
 *
 * @example
 * ```JS
 * myDsUtilitiesV7.reorderDsNode(exampleDsNode);
 * ```
 *
 * @param dsNode - the input node from a Domain Specification
 */
export function reorderDsNode(dsNode: DsNodeGeneric): void {
  // automatically detect the dsNode type
  // ds object, context, root node, property node, class node, datatype node, enumeration node
  if (!isObject(dsNode)) {
    throw new Error("The given input was not an object, as required.");
  }
  if (dsNode["@type"]) {
    switch (dsNode["@type"]) {
      // root node
      case "ds:DomainSpecification":
        reorderNodeWithSchema(dsNode, nodeSchemaRoot);
        break;
      // property node
      case "sh:PropertyShape":
        reorderNodeWithSchema(dsNode, nodeSchemaProperty);
        break;
      // class node / enumeration node
      case "sh:NodeShape":
        if (dsNode["sh:in"]) {
          reorderNodeWithSchema(dsNode, nodeSchemaEnumeration);
        } else {
          // class node (restricted, standard class) or standard enumeration - same structure
          reorderNodeWithSchema(dsNode, nodeSchemaClass);
        }
        break;
    }
  } else if (dsNode["@context"]) {
    // ds object
    reorderNodeWithSchema(dsNode, nodeSchemaDs);
  } else if (dsNode.ds && dsNode.schema && dsNode.sh) {
    // context
    reorderNodeWithSchema(dsNode, nodeSchemaContext);
  } else if (dsNode["sh:datatype"]) {
    // datatype node
    reorderNodeWithSchema(dsNode, nodeSchemaDataType);
  } else if (dsNode["sh:node"]) {
    // wrapper for class node / enumeration node - typically no term would be added here
  } else if (dsNode["@value"]) {
    // a language tagged-value
    reorderNodeWithSchema(dsNode, nodeSchemaLanguageTaggedString);
  } else if (dsNode["@id"]) {
    // reference node or enumeration member node - same structure
    reorderNodeWithSchema(dsNode, nodeSchemaEnumerationMember);
  }
}
