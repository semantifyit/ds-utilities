import { NodeSchema } from "../../../base/types/NodeSchema.type";

// These are the terms used by a Class node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
export const nodeSchemaClass: NodeSchema = [
  {
    term: "@id",
    required: true,
    valueType: "string"
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:NodeShape"
  },
  {
    term: "sh:class",
    required: true,
    valueType: "array"
  },
  {
    term: "sh:closed",
    required: false,
    valueType: "boolean"
  },
  {
    term: "ds:propertyDisplayOrder",
    required: false,
    valueType: "array"
  },
  {
    term: "sh:property",
    required: false,
    valueType: "array"
  }
];