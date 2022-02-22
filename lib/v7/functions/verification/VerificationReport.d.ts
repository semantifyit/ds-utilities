import { ErrorEntry } from "./ErrorEntry";
import { VerificationReportV7, VerificationResultV7 } from "../../types/VerificationV7.type";
export declare class VerificationReport {
    result: VerificationResultV7;
    errors: ErrorEntry[];
    constructor(result?: VerificationResultV7, errors?: ErrorEntry[]);
    addErrorEntry(e: ErrorEntry): void;
    updateResult(): void;
    toJson(): VerificationReportV7;
}
//# sourceMappingURL=VerificationReport.d.ts.map