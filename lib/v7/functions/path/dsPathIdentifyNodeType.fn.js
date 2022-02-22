"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathIdentifyNodeType = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const dsPathGetNode_fn_1 = require("./dsPathGetNode.fn");
const helper_1 = require("../../../base/helper/helper");
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
function dsPathIdentifyNodeType(dsNode, ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    const contextNode = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, "@context");
    if ((0, helper_1.deepEqual)(dsNode, contextNode)) {
        return pathGrammar_data_1.pathGrammarNodeTypes.context;
    }
    if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
        if (dsNode["@id"] === rootNode["@id"]) {
            return pathGrammar_data_1.pathGrammarNodeTypes.refRoot;
        }
        else if (dsNode["@id"].startsWith(rootNode["@id"])) {
            return pathGrammar_data_1.pathGrammarNodeTypes.refInt;
        }
        else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
            return pathGrammar_data_1.pathGrammarNodeTypes.refIntExt;
        }
        else {
            return pathGrammar_data_1.pathGrammarNodeTypes.refExt;
        }
    }
    if (dsNode["@type"] === "ds:DomainSpecification") {
        return pathGrammar_data_1.pathGrammarNodeTypes.root;
    }
    else if (dsNode["@type"] === "sh:NodeShape" &&
        ds["@graph"].find((el) => el["@id"] === dsNode["@id"]) !== undefined) {
        if (dsNode["@id"].startsWith(rootNode["@id"])) {
            return pathGrammar_data_1.pathGrammarNodeTypes.defInt;
        }
        else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
            return pathGrammar_data_1.pathGrammarNodeTypes.defIntExt;
        }
        else {
            return pathGrammar_data_1.pathGrammarNodeTypes.defExt;
        }
    }
    if (dsNode["@type"] === "sh:PropertyShape") {
        return pathGrammar_data_1.pathGrammarNodeTypes.property;
    }
    if (dsNode["sh:datatype"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.dataType;
    }
    if (dsNode["@type"] === "sh:NodeShape" && dsNode["sh:in"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.enumeration;
    }
    else if (dsNode["@type"] === "sh:NodeShape" &&
        dsNode["sh:property"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.class;
    }
    else if (dsNode["@type"] === "sh:NodeShape" &&
        dsNode["sh:class"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.class;
    }
    throw new Error("Could not identify a valid Path Grammar Node Type for the given input.");
}
exports.dsPathIdentifyNodeType = dsPathIdentifyNodeType;
//# sourceMappingURL=dsPathIdentifyNodeType.fn.js.map