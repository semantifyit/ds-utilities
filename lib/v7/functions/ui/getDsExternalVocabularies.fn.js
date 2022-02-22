"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsExternalVocabularies = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsExternalVocabularies(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["ds:usedVocabulary"]) {
        return (0, helper_1.cloneJson)(rootNode["ds:usedVocabulary"]);
    }
    return [];
}
exports.getDsExternalVocabularies = getDsExternalVocabularies;
//# sourceMappingURL=getDsExternalVocabularies.fn.js.map