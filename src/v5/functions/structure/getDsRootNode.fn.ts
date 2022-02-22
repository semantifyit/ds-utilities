import { DsV5, RootNodeV5 } from "../../types/DsGrammarV5.type";

/**
 * Returns a reference to the root node of the given Domain Specification
 *
 * @param ds - The input Domain Specification
 * @return The root node if the given DS
 */
export function getDsRootNode(ds: DsV5): RootNodeV5{
  if (!ds["@graph"]) {
    throw new Error(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V5 format."
    );
  }
  const rootNode = ds["@graph"].find(
    (el) =>
      Array.isArray(el["@type"]) &&
      el["@type"].includes("sh:NodeShape") &&
      el["@type"].includes("schema:CreativeWork")
  );
  if (!rootNode) {
    throw new Error(
      "The given DS has no identifiable root node in DS-V5 format."
    );
  }
  return rootNode;
}