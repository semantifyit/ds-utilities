"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyDsGrammarNodeType = void 0;
const getDsRootNode_fn_1 = require("./getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
const dsGrammar_data_1 = require("../../data/dsGrammar.data");
const dsPathGetNode_fn_1 = require("../path/dsPathGetNode.fn");
function identifyDsGrammarNodeType(dsNode, ds, sdoAdapter) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    const contextNode = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, "@context");
    if ((0, helper_1.deepEqual)(dsNode, contextNode)) {
        return dsGrammar_data_1.dsGrammarNodeTypes.context;
    }
    if ((0, helper_1.deepEqual)(dsNode, rootNode)) {
        return dsGrammar_data_1.dsGrammarNodeTypes.root;
    }
    if (dsNode["@type"] === "sh:PropertyShape") {
        return dsGrammar_data_1.dsGrammarNodeTypes.property;
    }
    if (dsNode["sh:datatype"]) {
        return dsGrammar_data_1.dsGrammarNodeTypes.dataType;
    }
    if (dsNode["@type"] === "sh:NodeShape") {
        if (dsNode["sh:property"]) {
            return dsGrammar_data_1.dsGrammarNodeTypes.classRestricted;
        }
        if (dsNode["sh:in"]) {
            return dsGrammar_data_1.dsGrammarNodeTypes.enumerationRestricted;
        }
        if (dsNode["sh:class"].length === 1 && sdoAdapter) {
            try {
                sdoAdapter.getEnumeration(dsNode["sh:class"][0]);
                return dsGrammar_data_1.dsGrammarNodeTypes.enumerationStandard;
            }
            catch (e) {
                return dsGrammar_data_1.dsGrammarNodeTypes.classStandard;
            }
        }
        else {
            return dsGrammar_data_1.dsGrammarNodeTypes.classStandard;
        }
    }
    if (dsNode["@id"]) {
        const match = ds["@graph"].find((el) => {
            return dsNode["@id"] === el["@id"];
        });
        if (match) {
            return identifyDsGrammarNodeType(match, ds, sdoAdapter);
        }
        return dsGrammar_data_1.dsGrammarNodeTypes.enumerationMember;
    }
    throw new Error("Could not find a match for the given DS Node.");
}
exports.identifyDsGrammarNodeType = identifyDsGrammarNodeType;
//# sourceMappingURL=identifyDsGrammarNodeType.fn.js.map