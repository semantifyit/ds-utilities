import { DsV7 } from "../../types/DsGrammarV7.type";
import { getLanguageString } from "../../../base/helper/helper";
import { getDsRootNode } from "../structure/getDsRootNode.fn";

/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V7.
 *
 * @param ds - the input DS
 * @param language  - the wished language for the description (optional)
 * @return  the description of the given DS
 */
export function getDsDescription(ds: DsV7, language?: string): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:description"]) {
    return getLanguageString(rootNode["schema:description"], language);
  }
  return undefined;
};