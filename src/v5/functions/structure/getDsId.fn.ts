import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the @id of the given DS (for DS-V5 this @id is found in outermost node).
 * A DS @id is mandatory for DS-V5.
 *
 * @param ds - the input DS
 * @return The @id of the given DS
 */
export function getDsId(ds: DsV5):string {
  if (!ds["@id"]) {
    throw new Error(
      "The given DS has no @id, which is mandatory for a DS in DS-V5 format."
    );
  }
  return ds["@id"];
}