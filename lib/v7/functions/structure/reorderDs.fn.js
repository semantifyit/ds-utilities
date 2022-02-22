"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderDs = void 0;
const helper_1 = require("../../../base/helper/helper");
const LanguageTaggedString_nodeSchema_1 = require("../../../base/data/LanguageTaggedString.nodeSchema");
const reorderDsNode_fn_1 = require("./reorderDsNode.fn");
const Ds_nodeSchema_1 = require("../../data/nodeSchemas/Ds.nodeSchema");
const Context_nodeSchema_1 = require("../../data/nodeSchemas/Context.nodeSchema");
function reorderDs(ds) {
    if (!(0, helper_1.isObject)(ds)) {
        throw new Error("The given input was not an object, as required.");
    }
    (0, helper_1.reorderNodeWithSchema)(ds, Ds_nodeSchema_1.nodeSchemaDs);
    (0, helper_1.reorderNodeWithSchema)(ds["@context"], Context_nodeSchema_1.nodeSchemaContext);
    const indexOfRootNode = ds["@graph"].findIndex((el) => el["@type"] === "ds:DomainSpecification");
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
exports.reorderDs = reorderDs;
function reorderClassLikeNode(classNode) {
    (0, reorderDsNode_fn_1.reorderDsNode)(classNode);
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
function reorderPropertyNode(propertyNode) {
    (0, reorderDsNode_fn_1.reorderDsNode)(propertyNode);
    reorderMetaPropertyIfExists(propertyNode, "rdfs:label");
    reorderMetaPropertyIfExists(propertyNode, "rdfs:comment");
    for (const rangeNode of propertyNode["sh:or"]) {
        (0, reorderDsNode_fn_1.reorderDsNode)(rangeNode);
        reorderMetaPropertyIfExists(rangeNode, "rdfs:label");
        reorderMetaPropertyIfExists(rangeNode, "rdfs:comment");
        if (rangeNode["sh:node"]) {
            reorderClassLikeNode(rangeNode["sh:node"]);
        }
    }
}
function reorderMetaPropertyIfExists(dsNode, term) {
    if (dsNode[term]) {
        reorderMetaValues(dsNode[term]);
    }
}
function reorderMetaValues(valuesArray) {
    for (const valObj of valuesArray) {
        (0, helper_1.reorderNodeWithSchema)(valObj, LanguageTaggedString_nodeSchema_1.nodeSchemaLanguageTaggedString);
    }
}
//# sourceMappingURL=reorderDs.fn.js.map