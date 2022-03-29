import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";

/**
 * Returns the version of the given DS (the version of the DS instance itself).
 *
 * `schema:version` is [optional in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const version = myDsUtilitiesV7.getDsVersion(exampleDs);
 * // "1.00"
 * ```
 *
 * @param ds - the input Domain Specification
 * @return The ds version as string, e.g. "1.04"
 */
export function getDsVersion(ds: DsV7): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:version"]) {
    return rootNode["schema:version"];
  }
  return undefined;
}
