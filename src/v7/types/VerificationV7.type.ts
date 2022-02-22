import { NodeSchema } from "../../base/types/NodeSchema.type";

export type ErrorSeverityV7 = "Warning" | "Error" | "Critical";

export type ErrorEntryV7 = {
  severity : ErrorSeverityV7,
  path: string,
  description: string
}

export type VerificationResultV7 = "Valid" | "ValidWithWarnings" | "Invalid";

export type VerificationReportV7 = {
  result: VerificationResultV7,
  errors: ErrorEntryV7[]
}

export type VerificationConfigV7 = {
  nodeSchemaClass?: NodeSchema,
  nodeSchemaContext?: NodeSchema,
  nodeSchemaDataType?: NodeSchema,
  nodeSchemaDs?: NodeSchema,
  nodeSchemaEnumeration?: NodeSchema,
  nodeSchemaEnumerationMember?: NodeSchema,
  nodeSchemaProperty?: NodeSchema,
  nodeSchemaRoot?: NodeSchema
}