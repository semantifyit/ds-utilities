import { getDsId } from "./getDsId.fn";
import { DsV7 } from "../../types/DsGrammarV7.type";
import { customAlphabet } from "nanoid";

/**
 * Creates a new **fragment-id** according to the [DS-V7 specification](https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3.-generating-ids-for-inner-nodeshape).
 *
 * It is possible to pass a Domain Specification as parameter to ensured that the generated fragment-id has not been used in the given DS yet.
 *
 * @example
 * ```JS
 * const newFragmentId = myDsUtilitiesV7.generateInnerNodeId(exampleDs);
 * // "AfgGa"
 * ```
 *
 * @param ds - the input Domain Specification
 * @return A new the fragment-id
 */
export function generateInnerNodeId(ds?: DsV7): string {
  let dsId;
  let newId;
  if (ds) {
    dsId = getDsId(ds);
  }
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    5
  );
  do {
    newId = nanoid();
  } while (ds !== undefined && JSON.stringify(ds).includes(dsId + "#" + newId));
  return newId;
}
