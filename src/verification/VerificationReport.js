class VerificationReport {
  constructor() {
    this.errors = [];
    this.result = undefined; // "Valid", "ValidWithWarnings", "Invalid"
  }

  addErrorEntry(e) {
    this.errors.push(e);
  }

  toJson() {
    const invalid = this.errors.find(
      (el) => el.severity === "Error" || el.severity === "Critical"
    );
    if (invalid) {
      this.result = "Invalid";
    } else {
      const ValidWithWarnings = this.errors.find(
        (el) => el.severity === "Warning"
      );
      if (ValidWithWarnings) {
        this.result = "ValidWithWarnings";
      } else {
        this.result = "Valid";
      }
    }
    return JSON.parse(JSON.stringify(this)); // This is done to generate a plain json output (without Class information)
  }
}

module.exports = VerificationReport;
