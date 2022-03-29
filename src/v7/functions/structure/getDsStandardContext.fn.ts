import { ContextV7 } from "../../types/DsGrammarV7.type";
import { standardContext } from "../../data/standardContext.data";
import { cloneJson } from "../../../base/helper/helper";

/**
 * Returns the [standard `@context` for DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/context).
 *
 * @example
 * ```JS
 * const standardContext = myDsUtilitiesV7.getDsStandardContext();
 * // returns the DS-V7 standard @context as JS object
 * ```
 *
 * @return The standard @context for DS-V7
 */
export function getDsStandardContext(): ContextV7 {
  return cloneJson(standardContext);
}
