import { DsV7 } from "../../types/DsGrammarV7.type";
import { getLanguageString } from "../../../base/helper/helper";
import { getDsRootNode } from "../structure/getDsRootNode.fn";

/**
 * Returns the description of the given DS for a language (there could be descriptions in different languages).
 *
 * `schema:description` is [optional in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const description = myDsUtilitiesV7.getDsDescription(exampleDs);
 * // "This is an example Domain Specification."
 * const descriptionSpanish = myDsUtilitiesV7.getDsDescription(exampleDs, "es");
 * // "Esta es una DS ejemplar."
 * ```
 *
 * @param ds - the input Domain Specification
 * @param language - the wished language for the description
 * @return The description of the given DS, if any
 */
export function getDsDescription(
  ds: DsV7,
  language?: string
): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:description"]) {
    return getLanguageString(rootNode["schema:description"], language);
  }
  return undefined;
}
