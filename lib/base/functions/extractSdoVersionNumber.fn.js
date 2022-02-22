"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSdoVersionNumber = void 0;
function extractSdoVersionNumber(schemaVersionValue) {
    if (schemaVersionValue.includes("schema.org/docs/")) {
        let versionRegex = /.*schema\.org\/docs\/releases\.html#v([0-9.]+)(\/)?/g;
        let match = versionRegex.exec(schemaVersionValue);
        if (match && match[1]) {
            return match[1];
        }
    }
    else if (schemaVersionValue.includes("schema.org/version/")) {
        let versionRegex = /.*schema\.org\/version\/([0-9.]+)(\/)?/g;
        let match = versionRegex.exec(schemaVersionValue);
        if (match && match[1]) {
            return match[1];
        }
    }
    throw new Error("The given url did not fit the expected format for a schema.org version url.");
}
exports.extractSdoVersionNumber = extractSdoVersionNumber;
//# sourceMappingURL=extractSdoVersionNumber.fn.js.map