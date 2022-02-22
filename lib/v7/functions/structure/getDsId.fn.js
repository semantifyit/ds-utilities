"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsId = void 0;
const getDsRootNode_fn_1 = require("./getDsRootNode.fn");
function getDsId(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["@id"]) {
        throw new Error("The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format.");
    }
    return rootNode["@id"];
}
exports.getDsId = getDsId;
//# sourceMappingURL=getDsId.fn.js.map