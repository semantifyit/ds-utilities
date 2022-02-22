"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsUtilitiesBase = void 0;
const getDsSpecificationVersion_fn_1 = require("./functions/getDsSpecificationVersion.fn");
const prettyPrintCompactedIRIs_fn_1 = require("./functions/prettyPrintCompactedIRIs.fn");
const extractSdoVersionNumber_fn_1 = require("./functions/extractSdoVersionNumber.fn");
class DsUtilitiesBase {
    constructor() {
        this.getDsSpecificationVersion = getDsSpecificationVersion_fn_1.getDsSpecificationVersion;
        this.prettyPrintCompactedIRIs = prettyPrintCompactedIRIs_fn_1.prettyPrintCompactedIRIs;
        this.extractSdoVersionNumber = extractSdoVersionNumber_fn_1.extractSdoVersionNumber;
    }
    getDsUtilitiesVersion() {
        return this.dsUtilitiesVersion;
    }
}
exports.DsUtilitiesBase = DsUtilitiesBase;
//# sourceMappingURL=DsUtilitiesBase.js.map