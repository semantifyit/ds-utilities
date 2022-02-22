import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { cloneJson } from "../../../base/helper/helper";

/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is optional in DS-V7.
 *
 * @param ds - the input DS
 * @return array with the target classes (empty if none)
 */
export function getDsTargetClasses(ds: DsV7): string[] {
  const rootNode = getDsRootNode(ds);
  if (rootNode["sh:targetClass"]) {
    return cloneJson(rootNode["sh:targetClass"]);
  }
  return []; // instead of undefined, send an empty array for convenience
}
