import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { cloneJson } from "../../../base/helper/helper";

/**
 * Returns the used external vocabularies of the given DS.
 *
 * `ds:usedVocabulary` is [optional in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const name = myDsUtilitiesV7.getDsExternalVocabularies(exampleDs);
 * // [ "https://semantify.it/voc/IaiA2RES_" ]
 * ```
 *
 * @param ds - the input Domain Specification
 * @return Array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabularies(ds: DsV7): string[] {
  const rootNode = getDsRootNode(ds);
  if (rootNode["ds:usedVocabulary"]) {
    return cloneJson(rootNode["ds:usedVocabulary"]);
  }
  return []; // instead of undefined, send an empty array for convenience
}
