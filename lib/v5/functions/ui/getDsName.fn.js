"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsName = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsName(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    return rootNode["schema:name"];
}
exports.getDsName = getDsName;
//# sourceMappingURL=getDsName.fn.js.map