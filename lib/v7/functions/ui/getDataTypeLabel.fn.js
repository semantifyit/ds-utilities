"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataTypeLabel = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getDataTypeLabel(dsDataType) {
    const match = datatypes_data_1.dataTypeMappingToLabel[dsDataType];
    if (!match) {
        throw new Error("Given input '" +
            dsDataType +
            "' is not a valid xsd/rdf datatype in DS-V7.");
    }
    return match;
}
exports.getDataTypeLabel = getDataTypeLabel;
//# sourceMappingURL=getDataTypeLabel.fn.js.map