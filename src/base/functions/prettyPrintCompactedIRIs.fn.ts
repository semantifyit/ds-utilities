/**
 * Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
 * If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator ( schema: )
 *
 * todo - example
 *
 * @param compactedIRIs - the input IRI or array of IRIs
 * @return The pretty string for the given input
 */
/**
 * Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
 * If an IRI belongs to schema.org, then the IRI is returned without the `schema:` vocabulary indicator.
 *
 * @example
 * ```JS
 * const targetClasses = [ "schema:Hotel", "ex:SkiLift" ];
 * const prettifiedTargetClasses = myDsUtilities.prettyPrintCompactedIRIs(targetClasses);
 * // "Hotel + ex:SkiLift"
 *
 * const property = "schema:description";
 * const prettifiedProperty = myDsUtilities.prettyPrintCompactedIRIs(property);
 * // "description"
 * ```
 *
 * @param compactedIRIs - the input IRI or array of IRIs
 * @return The pretty-string for the given input
 */
export function prettyPrintCompactedIRIs(
  compactedIRIs: string | string[]
): string {
  if (Array.isArray(compactedIRIs)) {
    return compactedIRIs.map(prettyPrintCompactedIRIs).join(" + ");
  } else {
    if (compactedIRIs.startsWith("schema:")) {
      return compactedIRIs.substring("schema:".length);
    }
    return compactedIRIs;
  }
}
