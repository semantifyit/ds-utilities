import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";

/**
 * Returns the used ds version (schema:version) of the given DS.
 * schema:version is optional in DS-V7.
 *
 * @param ds - the input DS
 * @return the ds version as simple string, e.g. "1.04"
 */
export function getDsVersion(ds:DsV7): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:version"]) {
    return rootNode["schema:version"];
  }
  return undefined;
}