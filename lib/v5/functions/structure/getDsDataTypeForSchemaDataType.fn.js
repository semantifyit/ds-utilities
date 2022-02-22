"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDataTypeForSchemaDataType = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getDsDataTypeForSchemaDataType(schemaDataType) {
    const match = Object.keys(datatypes_data_1.dataTypeMapping).find((el) => {
        return datatypes_data_1.dataTypeMapping[el] === schemaDataType;
    });
    if (!match) {
        throw new Error("Given input '" +
            schemaDataType +
            "' is not a valid schema.org datatype in DS-V5.");
    }
    return match;
}
exports.getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;
//# sourceMappingURL=getDsDataTypeForSchemaDataType.fn.js.map