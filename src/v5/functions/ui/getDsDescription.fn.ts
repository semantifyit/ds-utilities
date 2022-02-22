import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V5.
 *
 * @param ds - the input DS
 * @return  the description of the given DS
 */
export function getDsDescription(ds: DsV5): string | undefined {
  const rootNode = getDsRootNode(ds);
  return rootNode["schema:description"];
}