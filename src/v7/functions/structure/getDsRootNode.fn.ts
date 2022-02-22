import { DsV7, RootNodeV7 } from "../../types/DsGrammarV7.type";

/**
 * Returns a reference to the root node of the given Domain Specification
 *
 * @param ds - The input Domain Specification
 * @return The root node if the given DS
 */
export function getDsRootNode(ds: DsV7): RootNodeV7 {
  if (!ds["@graph"]) {
    throw new Error(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V7 format."
    );
  }
  const rootNode = ds["@graph"].find(
    (el) => el["@type"] === "ds:DomainSpecification"
  );
  if (!rootNode) {
    throw new Error(
      "The given DS has no identifiable root node in DS-V7 format."
    );
  }
  return rootNode as RootNodeV7;
}