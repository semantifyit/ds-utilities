import { NodeSchema } from "../../base/types/NodeSchema.type";

export type ErrorSeverityV7 = "Warning" | "Error" | "Critical";

export type ErrorEntryV7 = {
  severity: ErrorSeverityV7;
  path: string;
  description: string;
};

export type VerificationResultV7 = "Valid" | "ValidWithWarnings" | "Invalid";

/**
 * This type is used by the function {@link verifyDs | verifyDs()} to represent a verification result for the Meta verification of a Domain Specification.
 *
 * A verification report has only 2 fields:
 * * `result` is a string that represents the overall result of the verification. The value can be `Valid`, `ValidWithWarnings` , or `Invalid`.
 * * `errors` is an array of errors detected. Each error entry has the following fields:
 *    * `severity`. The value can be `Warning`, `Error`, or `Critical`.
 *    * `path`. A path pointing to the error part of the DS. (null if none)
 *    * `description`. A textual description about the error.
 *
 */
export type VerificationReportV7 = {
  result: VerificationResultV7;
  errors: ErrorEntryV7[];
};

export type VerificationConfigV7 = {
  nodeSchemaClass?: NodeSchema;
  nodeSchemaContext?: NodeSchema;
  nodeSchemaDataType?: NodeSchema;
  nodeSchemaDs?: NodeSchema;
  nodeSchemaEnumeration?: NodeSchema;
  nodeSchemaEnumerationMember?: NodeSchema;
  nodeSchemaProperty?: NodeSchema;
  nodeSchemaRoot?: NodeSchema;
};
