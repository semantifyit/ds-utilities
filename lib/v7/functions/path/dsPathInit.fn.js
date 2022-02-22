"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathInit = void 0;
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
function dsPathInit(nodeType = pathGrammar_data_1.pathGrammarNodeTypes.root, nodeId) {
    switch (nodeType) {
        case pathGrammar_data_1.pathGrammarNodeTypes.root:
            return "$";
        case pathGrammar_data_1.pathGrammarNodeTypes.defInt:
            return "#" + nodeId.split("#")[1];
        case pathGrammar_data_1.pathGrammarNodeTypes.defExt:
            return nodeId.split("/").pop();
        case pathGrammar_data_1.pathGrammarNodeTypes.defIntExt:
            return nodeId.split("/").pop();
        case pathGrammar_data_1.pathGrammarNodeTypes.context:
            return "@context";
        default:
            throw new Error("Unknown node type to initialize a DS Path: " + nodeType);
    }
}
exports.dsPathInit = dsPathInit;
//# sourceMappingURL=dsPathInit.fn.js.map