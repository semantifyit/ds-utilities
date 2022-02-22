"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathAddition = void 0;
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
function dsPathAddition(dsPath, additionType, inputForPath) {
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.property) {
        return dsPath + "." + inputForPath;
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.dataType) {
        return dsPath + "/" + inputForPath;
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.class ||
        additionType === pathGrammar_data_1.pathGrammarNodeTypes.enumeration) {
        return dsPath + "/" + inputForPath.join(",");
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refRoot) {
        return dsPath + "/@$";
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refInt) {
        return dsPath + "/@#" + inputForPath.split("#")[1];
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refExt) {
        return dsPath + "/@" + inputForPath.split("/").pop();
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refIntExt) {
        return dsPath + "/@" + inputForPath.split("/").pop();
    }
    throw new Error("Given additionType '" + additionType + "' unknown to function dsPathAddition().");
}
exports.dsPathAddition = dsPathAddition;
//# sourceMappingURL=dsPathAddition.fn.js.map