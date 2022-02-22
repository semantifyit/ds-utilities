"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsAuthorName = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsAuthorName(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
        return rootNode["schema:author"]["schema:name"];
    }
    return undefined;
}
exports.getDsAuthorName = getDsAuthorName;
//# sourceMappingURL=getDsAuthorName.fn.js.map