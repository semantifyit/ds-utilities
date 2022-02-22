"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationReport = void 0;
class VerificationReport {
    constructor(result = "Valid", errors = []) {
        this.result = result;
        this.errors = errors;
    }
    addErrorEntry(e) {
        this.errors.push(e);
        this.updateResult();
    }
    updateResult() {
        const invalid = this.errors.find((el) => el.severity === "Error" || el.severity === "Critical");
        if (invalid) {
            this.result = "Invalid";
        }
        else {
            const ValidWithWarnings = this.errors.find((el) => el.severity === "Warning");
            if (ValidWithWarnings) {
                this.result = "ValidWithWarnings";
            }
            else {
                this.result = "Valid";
            }
        }
    }
    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
}
exports.VerificationReport = VerificationReport;
//# sourceMappingURL=VerificationReport.js.map