"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsName = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsName(ds, language) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:name"]) {
        return (0, helper_1.getLanguageString)(rootNode["schema:name"], language);
    }
    return undefined;
}
exports.getDsName = getDsName;
;
//# sourceMappingURL=getDsName.fn.js.map