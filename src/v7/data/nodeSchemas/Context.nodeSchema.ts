import {
  NodeSchema,
  NodeSchemaEntry,
} from "../../../base/types/NodeSchema.type";
import { standardContext } from "../standardContext.data";

// These are the terms used by the @context for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
// This list is dynamically built out of the standard @context
export const nodeSchemaContext = constructContextSchema();

function constructContextSchema(): NodeSchema {
  const result: NodeSchema = [];
  for (const t of Object.keys(standardContext)) {
    const entry: NodeSchemaEntry = {
      term: t,
      required: true,
      valueType: "string",
    };
    if (typeof standardContext[t] !== "string") {
      entry.valueType = "object";
    }
    entry.value = standardContext[t];
    result.push(entry);
  }
  return result;
}
