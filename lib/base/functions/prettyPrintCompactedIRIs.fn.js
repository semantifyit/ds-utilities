"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrintCompactedIRIs = void 0;
function prettyPrintCompactedIRIs(compactedIRIs) {
    if (Array.isArray(compactedIRIs)) {
        return compactedIRIs.map(prettyPrintCompactedIRIs).join(" + ");
    }
    else {
        if (compactedIRIs.startsWith("schema:")) {
            return compactedIRIs.substring("schema:".length);
        }
        return compactedIRIs;
    }
}
exports.prettyPrintCompactedIRIs = prettyPrintCompactedIRIs;
//# sourceMappingURL=prettyPrintCompactedIRIs.fn.js.map