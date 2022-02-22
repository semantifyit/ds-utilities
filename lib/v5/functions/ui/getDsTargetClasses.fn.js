"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsTargetClasses = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsTargetClasses(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["sh:targetClass"]) {
        throw new Error("The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format.");
    }
    if (!Array.isArray(rootNode["sh:targetClass"])) {
        return (0, helper_1.cloneJson)([rootNode["sh:targetClass"]]);
    }
    return (0, helper_1.cloneJson)(rootNode["sh:targetClass"]);
}
exports.getDsTargetClasses = getDsTargetClasses;
//# sourceMappingURL=getDsTargetClasses.fn.js.map