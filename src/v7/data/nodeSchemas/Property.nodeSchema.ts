import { NodeSchema } from "../../../base/types/NodeSchema.type";


// These are the terms used by a property node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
export const nodeSchemaProperty: NodeSchema = [
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:PropertyShape"
  },
  {
    term: "sh:order",
    required: false,
    valueType: "integer"
  },
  {
    term: "sh:path",
    required: true,
    valueType: "string"
  },
  {
    term: "rdfs:comment",
    required: false,
    valueType: "array"
  },
  {
    term: "sh:minCount",
    required: false,
    valueType: "integer"
  },
  {
    term: "sh:maxCount",
    required: false,
    valueType: "integer"
  },
  {
    term: "sh:equals",
    required: false,
    valueType: "array"
  },
  {
    term: "sh:disjoint",
    required: false,
    valueType: "array"
  },
  {
    term: "sh:lessThan",
    required: false,
    valueType: "array"
  },
  {
    term: "sh:lessThanOrEquals",
    required: false,
    valueType: "array"
  },
  {
    term: "sh:or",
    required: true,
    valueType: "array"
  }
];