"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsId = void 0;
function getDsId(ds) {
    if (!ds["@id"]) {
        throw new Error("The given DS has no @id, which is mandatory for a DS in DS-V5 format.");
    }
    return ds["@id"];
}
exports.getDsId = getDsId;
//# sourceMappingURL=getDsId.fn.js.map