"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDescription = void 0;
const helper_1 = require("../../../base/helper/helper");
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsDescription(ds, language) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:description"]) {
        return (0, helper_1.getLanguageString)(rootNode["schema:description"], language);
    }
    return undefined;
}
exports.getDsDescription = getDsDescription;
;
//# sourceMappingURL=getDsDescription.fn.js.map