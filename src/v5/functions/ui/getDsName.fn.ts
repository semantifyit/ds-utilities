import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V5.
 *
 * @param ds - the input DS
 * @return The name of the given DS
 */
export function getDsName(ds: DsV5): string | undefined {
  const rootNode = getDsRootNode(ds);
  return rootNode["schema:name"];
}
