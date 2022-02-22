import { DsV7 } from "../../types/DsGrammarV7.type";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { getLanguageString } from "../../../base/helper/helper";

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V7.
 *
 * @param ds - the input DS
 * @param language - the wished language for the name (optional)
 * @return The name of the given DS
 */
export function getDsName(ds: DsV7, language?: string): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:name"]) {
    return getLanguageString(rootNode["schema:name"], language);
  }
  return undefined;
}
