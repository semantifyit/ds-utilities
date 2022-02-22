import { standardContext } from "../../data/standardContext.data";
import { cloneJson } from "../../../base/helper/helper";
import { ContextV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the standard @context for DS-V5 (clone - no reference).
 *
 * @return The standard @context for DS-V5
 */
export function getDsStandardContext(): ContextV5 {
  return cloneJson(standardContext);
}
