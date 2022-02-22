import { NodeSchema } from "../../../base/types/NodeSchema.type";

// These are the terms used by a DS Object for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
export const nodeSchemaDs: NodeSchema = [
  {
    term: "@context",
    required: true,
    valueType: "object"
  },
  {
    term: "@graph",
    required: true,
    valueType: "array"
  }
];