import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { getLanguageString } from "../../../base/helper/helper";

/**
 * Returns the name of the given DS for a language (there could be names in different languages).
 *
 * `schema:name` is [optional in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const name = myDsUtilitiesV7.getDsName(exampleDs);
 * // "Example DS"
 * const nameSpanish = myDsUtilitiesV7.getDsName(exampleDs, "es");
 * // "DS ejemplar"
 * ```
 *
 * @param ds - the input Domain Specification
 * @param language - the wished language for the name
 * @return The name of the given DS, if any
 */
export function getDsName(ds: DsV7, language?: string): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:name"]) {
    return getLanguageString(rootNode["schema:name"], language);
  }
  return undefined;
}
