import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "./getDsRootNode.fn";

/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds - the input DS
 * @return The @id of the given DS
 */
export function getDsId(ds: DsV7): string {
  const rootNode = getDsRootNode(ds);
  if (!rootNode["@id"]) {
    throw new Error(
      "The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["@id"];
}
