import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";

/**
 * Returns the author name of the given DS.
 *
 * `schema:author` is [optional in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const name = myDsUtilitiesV7.getDsAuthorName(exampleDs);
 * // "John Doe"
 * ```
 *
 * @param ds - the input Domain Specification
 * @return The author name of the given DS, if any
 */
export function getDsAuthorName(ds: DsV7): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
    return rootNode["schema:author"]["schema:name"];
  }
  return undefined;
}
