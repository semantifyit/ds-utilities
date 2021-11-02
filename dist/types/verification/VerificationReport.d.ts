export = VerificationReport;
declare class VerificationReport {
    errors: any[];
    result: string;
    addErrorEntry(e: any): void;
    toJson(): any;
}
