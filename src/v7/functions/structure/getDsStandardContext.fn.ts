import { ContextV7 } from "../../types/DsGrammarV7.type";
import { standardContext } from "../../data/standardContext.data";
import { cloneJson } from "../../../base/helper/helper";

/**
 * Returns the standard @context for DS-V7 (clone - no reference).
 *
 * @return The standard @context for DS-V7
 */
export function getDsStandardContext(): ContextV7 {
  return cloneJson(standardContext);
}