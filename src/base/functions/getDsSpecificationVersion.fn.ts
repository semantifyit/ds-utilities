import { DsGeneric } from "../types/DsGrammarGeneric.type";

/**
 * Identifies the used DS-Specification version used by the given Domain Specification.
 *
 * @example
 * ```JS
 * const usedVersion = myDsUtilities.getDsSpecificationVersion(exampleDs);
 * // "7.0" (assuming the given DS 'exampleDs' uses DsV7)
 * ```
 *
 * @param ds - The input Domain Specification
 * @return The detected DS-Specification version
 */
export function getDsSpecificationVersion(ds: DsGeneric): string {
  if (!Array.isArray(ds["@graph"])) {
    throw new Error(
      "The given DS has no @graph array, which is expected for any DS version."
    );
  }
  // check if the version is "7.0" or later
  try {
    // expected root node format for DS-V7 and later
    const rootNode = ds["@graph"].find(
      (el) => el["@type"] === "ds:DomainSpecification"
    );
    if (rootNode) {
      return rootNode["ds:version"];
    }
  } catch (e) {
    // DS is not from 7.0 or later
  }
  // check if the version used is "5.0"
  try {
    // expected root node format for DS-V5
    const rootNode = ds["@graph"].find(
      (el) =>
        Array.isArray(el["@type"]) &&
        el["@type"].includes("sh:NodeShape") &&
        el["@type"].includes("schema:CreativeWork")
    );
    if (rootNode) {
      return "5.0";
    }
  } catch (e) {
    // DS is not from 5.0
  }
  // throw an error if the version could not been determined
  throw new Error(
    "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
  );
}
