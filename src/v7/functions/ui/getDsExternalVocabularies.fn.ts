import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { cloneJson } from "../../../base/helper/helper";

/**
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS (clone - no reference).
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {- the input DS
 * @return array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabularies(ds: DsV7): string[] {
  const rootNode = getDsRootNode(ds);
  if (rootNode["ds:usedVocabulary"]) {
    return cloneJson(rootNode["ds:usedVocabulary"]);
  }
  return []; // instead of undefined, send an empty array for convenience
}