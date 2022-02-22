"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDescription = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsDescription(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    return rootNode["schema:description"];
}
exports.getDsDescription = getDsDescription;
//# sourceMappingURL=getDsDescription.fn.js.map