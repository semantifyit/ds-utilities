"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsRootNode = void 0;
function getDsRootNode(ds) {
    if (!ds["@graph"]) {
        throw new Error("The given DS has no @graph array, which is mandatory for a DS in DS-V7 format.");
    }
    const rootNode = ds["@graph"].find((el) => el["@type"] === "ds:DomainSpecification");
    if (!rootNode) {
        throw new Error("The given DS has no identifiable root node in DS-V7 format.");
    }
    return rootNode;
}
exports.getDsRootNode = getDsRootNode;
//# sourceMappingURL=getDsRootNode.fn.js.map