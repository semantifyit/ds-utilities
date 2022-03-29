import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "./getDsRootNode.fn";

/**
 * Returns the `@id` of the given DS (for DS-V7 this @id is found in the root node).
 *
 * An `@id` is [mandatory in DS-V7](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#2.-key-value-table).
 *
 * @example
 * ```JS
 * const dsId = myDsUtilitiesV7.getDsId(exampleDs);
 * // "https://semantify.it/ds/_1hRVOT8Q"
 * ```
 *
 * @param ds - the input Domain Specification
 * @return The `@id` of the given Domain Specification
 */
export function getDsId(ds: DsV7): string {
  const rootNode = getDsRootNode(ds);
  if (!rootNode["@id"]) {
    throw new Error(
      "The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["@id"];
}
