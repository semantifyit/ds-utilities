import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { cloneJson } from "../../../base/helper/helper";

/**
 * Returns the target classes of the given DS.
 *
 * `sh:targetClass` is [optional in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const targetClasses = myDsUtilitiesV7.getDsTargetClasses(exampleDs);
 * // [ "schema:Hotel", "schema:Restaurant" ]
 * ```
 *
 * @param ds - the input Domain Specification
 * @return Array with the target classes (empty if none)
 */
export function getDsTargetClasses(ds: DsV7): string[] {
  const rootNode = getDsRootNode(ds);
  if (rootNode["sh:targetClass"]) {
    return cloneJson(rootNode["sh:targetClass"]);
  }
  return []; // instead of undefined, send an empty array for convenience
}
