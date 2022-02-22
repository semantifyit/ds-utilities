"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsTargetClasses = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsTargetClasses(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["sh:targetClass"]) {
        return (0, helper_1.cloneJson)(rootNode["sh:targetClass"]);
    }
    return [];
}
exports.getDsTargetClasses = getDsTargetClasses;
;
//# sourceMappingURL=getDsTargetClasses.fn.js.map