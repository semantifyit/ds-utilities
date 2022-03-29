import { NodeSchema } from "../types/NodeSchema.type";

/**
 * These are the terms used by a language tagged value for DS-V7 (e.g. value of schema:name)
 * Listed in the recommended order as they should be listed in their lexical representation
 * */
export const nodeSchemaLanguageTaggedString: NodeSchema = [
  {
    term: "@language",
    required: true,
    valueType: "string",
  },
  {
    term: "@value",
    required: true,
    valueType: "string",
  },
];
