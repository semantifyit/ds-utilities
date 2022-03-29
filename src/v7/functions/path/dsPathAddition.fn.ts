import { pathGrammarNodeTypes as PGN } from "../../data/pathGrammar.data";
import { PathGrammarNodeTypeV7 } from "../../types/PathGrammarV7.type";

/**
 * Appends a new token to a given [DS-Path](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/dspath).
 *
 * A DS-Path can be initialized with the function {@link dsPathInit | dsPathInit()}.
 *
 * The `inputForPath`-parameter and the resulting addition to the DS-Path depend on the token type (parameter `additionType`) to be added:
 *
 * * `additionType` = `Property` -> `inputForPath` must be the IRI of the Property, e.g. `schema:url`
 * * `additionType` = `DataType` -> `inputForPath` must be the IRI of the DataType, e.g. `xsd:string`
 * * `additionType` = `Class` or `Enumeration` -> `inputForPath` must be the IRIs of classes/enumeration as array, e.g. `[ "schema:Room", "schema:Product" ]` or `[ "schema:DayOfWeek" ]`
 * * `additionType` = `RootReference` -> `inputForPath` is not needed
 * * `additionType` = `InternalReference` -> `inputForPath` must be the `@id` of the internal node, e.g. `https://semantify.it/ds/_1hRVOT8Q#sXZwe`
 * * `additionType` = `ExternalReference` -> `inputForPath` must be the `@id` of the external node, e.g. `https://semantify.it/ds/_1hRVOT8Q`
 * * `additionType` = `InternalExternalReference` -> `inputForPath` must be the `@id` of the internal node from an external node, e.g. `https://semantify.it/ds/_1hRVOT8Q#sXZwe`
 *
 * @example
 * ```JS
 * const oldPath = "$.schema:address";
 * const newPath = myDsUtilitiesV7.dsPathAddition(oldPath, "Class", [ "schema:PostalAddress" ] );
 * // "$.schema:address/schema:PostalAddress"
 * ```
 *
 * @param dsPath - the given DS-Path to augment
 * @param additionType - the kind of addition to be added
 * @param inputForPath - input that depends on the given additionType, which is used for the dsPath addition
 * @return the resulting DS-Path
 */
export function dsPathAddition(
  dsPath: string,
  additionType: PathGrammarNodeTypeV7,
  inputForPath?: string | string[]
): string {
  // Property
  if (additionType === PGN.property) {
    return dsPath + "." + inputForPath; // inputForPath = IRI of Property, e.g. schema:url
  }
  // DataType
  if (additionType === PGN.dataType) {
    return dsPath + "/" + inputForPath; // inputForPath = IRI of DataType, e.g. xsd:string
  }
  // Class/Enumeration
  if (additionType === PGN.class || additionType === PGN.enumeration) {
    return dsPath + "/" + (inputForPath as string[]).join(","); // inputForPath = sh:class array, e.g. ["schema:Room", "schema:Product"]
  }
  // Reference - Root Node
  if (additionType === PGN.refRoot) {
    return dsPath + "/@$"; // inputForPath is not needed
  }
  // Reference - Internal reference
  if (additionType === PGN.refInt) {
    return dsPath + "/@#" + (inputForPath as string).split("#")[1]; // inputForPath = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
  // Reference - External reference
  if (additionType === PGN.refExt) {
    return dsPath + "/@" + (inputForPath as string).split("/").pop(); // inputForPath = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
  }
  // Reference - Internal node of an External reference
  if (additionType === PGN.refIntExt) {
    return dsPath + "/@" + (inputForPath as string).split("/").pop(); // inputForPath = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
  throw new Error(
    "Given additionType '" +
      additionType +
      "' unknown to function dsPathAddition()."
  );
}
