"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaContext = void 0;
const standardContext_data_1 = require("../standardContext.data");
exports.nodeSchemaContext = constructContextSchema();
function constructContextSchema() {
    const result = [];
    for (const t of Object.keys(standardContext_data_1.standardContext)) {
        const entry = {
            term: t,
            required: true,
            valueType: "string"
        };
        if (typeof standardContext_data_1.standardContext[t] !== "string") {
            entry.valueType = "object";
        }
        entry.value = standardContext_data_1.standardContext[t];
        result.push(entry);
    }
    return result;
}
//# sourceMappingURL=Context.nodeSchema.js.map