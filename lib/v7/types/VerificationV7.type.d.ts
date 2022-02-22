import { NodeSchema } from "../../base/types/NodeSchema.type";
export declare type ErrorSeverityV7 = "Warning" | "Error" | "Critical";
export declare type ErrorEntryV7 = {
    severity: ErrorSeverityV7;
    path: string;
    description: string;
};
export declare type VerificationResultV7 = "Valid" | "ValidWithWarnings" | "Invalid";
export declare type VerificationReportV7 = {
    result: VerificationResultV7;
    errors: ErrorEntryV7[];
};
export declare type VerificationConfigV7 = {
    nodeSchemaClass?: NodeSchema;
    nodeSchemaContext?: NodeSchema;
    nodeSchemaDataType?: NodeSchema;
    nodeSchemaDs?: NodeSchema;
    nodeSchemaEnumeration?: NodeSchema;
    nodeSchemaEnumerationMember?: NodeSchema;
    nodeSchemaProperty?: NodeSchema;
    nodeSchemaRoot?: NodeSchema;
};
//# sourceMappingURL=VerificationV7.type.d.ts.map