import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";

/**
 * Returns the used schema.org version of the given DS.
 *
 * `schema:schemaVersion` is [mandatory in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const sdoVersion = myDsUtilitiesV7.getDsSchemaVersion(exampleDs);
 * // "11.0"
 * ```
 *
 * @param ds - the input Domain Specification
 * @return The schema.org version identifier as string, e.g. `"11.0"`
 */
export function getDsSchemaVersion(ds: DsV7): string {
  const rootNode = getDsRootNode(ds);
  if (!rootNode["schema:schemaVersion"]) {
    throw new Error(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["schema:schemaVersion"];
}
