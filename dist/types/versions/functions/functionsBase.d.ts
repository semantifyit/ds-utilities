/**
 * Returns the used DS specification version used in the given DS.
 *
 * @param ds {object} - The input DS
 * @return {string} - The detected DS specification version used
 */
export function getDsSpecificationVersion(ds: object): string;
/**
 * Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
 * If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator (schema:)
 *
 * @param iri {string|string[]} - the input IRI or array of IRIs
 * @return {string}
 */
export function prettyPrintCompactedIRI(iri: string | string[]): string;
/**
 * Extracts the indicated schema.org version of a given URL. This functions accepts URLs with following formats
 * https://schema.org/docs/releases.html#v10.0
 * https://schema.org/version/3.4/
 * @param schemaVersionValue {string} - a URL specifying a version of schema.org
 * @return {string} - the version as a simple string
 */
export function extractSdoVersionNumber(schemaVersionValue: string): string;
