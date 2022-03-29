import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { DsV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 *
 * schema:author is optional in DS-V5.
 *
 * @param ds - the input DS
 * @return The author name of the given DS
 */
export function getDsAuthorName(ds: DsV5): string | undefined {
  const rootNode = getDsRootNode(ds);
  if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
    return rootNode["schema:author"]["schema:name"];
  }
  return undefined;
}
