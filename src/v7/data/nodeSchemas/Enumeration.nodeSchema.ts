import { NodeSchema } from "../../../base/types/NodeSchema.type";

// These are the terms used by an enumeration node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
export const nodeSchemaEnumeration: NodeSchema = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:NodeShape",
  },
  {
    term: "sh:class",
    required: true,
    valueType: "array",
  },
  {
    term: "sh:in",
    required: false,
    valueType: "array",
  },
];