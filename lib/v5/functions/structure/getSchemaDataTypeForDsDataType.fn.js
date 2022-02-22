"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaDataTypeForDsDataType = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getSchemaDataTypeForDsDataType(dsDataType) {
    const match = datatypes_data_1.dataTypeMapping[dsDataType];
    if (!match) {
        throw new Error("Given input '" +
            dsDataType +
            "' is not a valid xsd/rdf datatype in DS-V5.");
    }
    return match;
}
exports.getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;
//# sourceMappingURL=getSchemaDataTypeForDsDataType.fn.js.map