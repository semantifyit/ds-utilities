import { NodeSchema } from "../../../base/types/NodeSchema.type";

// These are the terms used by an enumeration member node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
export const nodeSchemaEnumerationMember: NodeSchema = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "rdfs:label",
    required: false,
    valueType: "array"
  },
  {
    term: "rdfs:comment",
    required: false,
    valueType: "array"
  },
];