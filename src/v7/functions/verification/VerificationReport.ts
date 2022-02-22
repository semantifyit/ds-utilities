import { ErrorEntry } from "./ErrorEntry";
import { VerificationReportV7, VerificationResultV7 } from "../../types/VerificationV7.type";

export class VerificationReport {
  constructor(
    public result: VerificationResultV7 = "Valid",
    public errors: ErrorEntry[] = []
  ) {
  }

  addErrorEntry(e: ErrorEntry) {
    this.errors.push(e);
    this.updateResult();
  }

  updateResult() {
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
  }

  toJson(): VerificationReportV7 {
    return JSON.parse(JSON.stringify(this)); // This is done to generate a plain json output (without Class information)
  }
}
