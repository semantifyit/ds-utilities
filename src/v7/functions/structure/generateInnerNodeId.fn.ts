import { getDsId } from "./getDsId.fn";
import { DsV7 } from "../../types/DsGrammarV7.type";
import { customAlphabet } from "nanoid";

/**
 * Creates a new fragment id according to the DS-V7 specification.
 * See https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape
 * It is possible to pass the current DS, this way it is ensured that the generated fragment id has not been used yet in the given DS
 *
 * @param ds - the input DS
 * @return returns a new the fragment id
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
