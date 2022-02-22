"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderDsNode = void 0;
const helper_1 = require("../../../base/helper/helper");
const Root_nodeSchema_1 = require("../../data/nodeSchemas/Root.nodeSchema");
const Property_nodeSchema_1 = require("../../data/nodeSchemas/Property.nodeSchema");
const Enumeration_nodeSchema_1 = require("../../data/nodeSchemas/Enumeration.nodeSchema");
const Class_nodeSchema_1 = require("../../data/nodeSchemas/Class.nodeSchema");
const Ds_nodeSchema_1 = require("../../data/nodeSchemas/Ds.nodeSchema");
const Context_nodeSchema_1 = require("../../data/nodeSchemas/Context.nodeSchema");
const DataType_nodeSchema_1 = require("../../data/nodeSchemas/DataType.nodeSchema");
const LanguageTaggedString_nodeSchema_1 = require("../../../base/data/LanguageTaggedString.nodeSchema");
const EnumerationMember_nodeSchema_1 = require("../../data/nodeSchemas/EnumerationMember.nodeSchema");
function reorderDsNode(dsNode) {
    if (!(0, helper_1.isObject)(dsNode)) {
        throw new Error("The given input was not an object, as required.");
    }
    if (dsNode["@type"]) {
        switch (dsNode["@type"]) {
            case "ds:DomainSpecification":
                (0, helper_1.reorderNodeWithSchema)(dsNode, Root_nodeSchema_1.nodeSchemaRoot);
                break;
            case "sh:PropertyShape":
                (0, helper_1.reorderNodeWithSchema)(dsNode, Property_nodeSchema_1.nodeSchemaProperty);
                break;
            case "sh:NodeShape":
                if (dsNode["sh:in"]) {
                    (0, helper_1.reorderNodeWithSchema)(dsNode, Enumeration_nodeSchema_1.nodeSchemaEnumeration);
                }
                else {
                    (0, helper_1.reorderNodeWithSchema)(dsNode, Class_nodeSchema_1.nodeSchemaClass);
                }
                break;
        }
    }
    else if (dsNode["@context"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, Ds_nodeSchema_1.nodeSchemaDs);
    }
    else if (dsNode.ds && dsNode.schema && dsNode.sh) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, Context_nodeSchema_1.nodeSchemaContext);
    }
    else if (dsNode["sh:datatype"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, DataType_nodeSchema_1.nodeSchemaDataType);
    }
    else if (dsNode["sh:node"]) {
    }
    else if (dsNode["@value"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, LanguageTaggedString_nodeSchema_1.nodeSchemaLanguageTaggedString);
    }
    else if (dsNode["@id"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, EnumerationMember_nodeSchema_1.nodeSchemaEnumerationMember);
    }
}
exports.reorderDsNode = reorderDsNode;
//# sourceMappingURL=reorderDsNode.fn.js.map