import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the used ds version (schema:version) of the given DS.
 * schema:version is optional in DS-V5.
 *
 * @param ds - the input DS
 * @return the ds version as number, e.g. 1.04
 */
export function getDsVersion(ds: DsV5): number | undefined {
  const rootNode = getDsRootNode(ds);
  return rootNode["schema:version"];
}