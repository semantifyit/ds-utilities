import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { cloneJson } from "../../../base/helper/helper";
import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is mandatory in DS-V5.
 *
 * @param ds - the input DS
 * @return array with the target classes (empty if none)
 */
export function getDsTargetClasses(ds: DsV5): string[] {
  const rootNode = getDsRootNode(ds);
  if (!rootNode["sh:targetClass"]) {
    throw new Error(
      "The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format."
    );
  }
  // return targetClass always as array for convenience
  if (!Array.isArray(rootNode["sh:targetClass"])) {
    return cloneJson([rootNode["sh:targetClass"]]);
  }
  return cloneJson(rootNode["sh:targetClass"]);
}
