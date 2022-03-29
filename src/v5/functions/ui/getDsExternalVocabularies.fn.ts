import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { cloneJson } from "../../../base/helper/helper";
import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the used external vocabularies (ds:usedVocabularies) of the given DS (clone - no reference).
 *
 * ds:usedVocabularies is optional in DS-V5.
 *
 * @param ds - the input DS
 * @return array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabularies(ds: DsV5): string[] {
  const rootNode = getDsRootNode(ds);
  if (rootNode["ds:usedVocabularies"]) {
    return cloneJson(rootNode["ds:usedVocabularies"]);
  }
  return []; // instead of undefined, send an empty array for convenience
}
