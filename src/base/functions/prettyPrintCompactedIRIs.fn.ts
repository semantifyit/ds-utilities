/**
 * Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
 * If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator (schema:)
 *
 * @param compactedIRIs - the input IRI or array of IRIs
 * @return The pretty string for the given input
 */
export function prettyPrintCompactedIRIs(compactedIRIs: string | string[]): string {
  if (Array.isArray(compactedIRIs)) {
    return compactedIRIs.map(prettyPrintCompactedIRIs).join(" + ");
  } else {
    if (compactedIRIs.startsWith("schema:")) {
      return compactedIRIs.substring("schema:".length);
    }
    return compactedIRIs;
  }
}