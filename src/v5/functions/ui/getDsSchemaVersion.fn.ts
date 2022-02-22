import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { DsV5 } from "../../types/DsGrammarV5.type";
import { extractSdoVersionNumber } from "../../../base/functions/extractSdoVersionNumber.fn";

/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V5.
 *
 * @param ds - the input DS
 * @return  the schema.org version identifier as simple string, e.g. "11.0"
 */
export function getDsSchemaVersion(ds: DsV5): string {
  const rootNode = getDsRootNode(ds);
  if (!rootNode["schema:schemaVersion"]) {
    throw new Error(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format."
    );
  }
  return extractSdoVersionNumber(rootNode["schema:schemaVersion"]);
}