"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsVersion = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsVersion(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    return rootNode["schema:version"];
}
exports.getDsVersion = getDsVersion;
//# sourceMappingURL=getDsVersion.fn.js.map