/**
 * Extracts the indicated schema.org version of a given URL. This functions accepts URLs with following formats
 * https://schema.org/docs/releases.html#v10.0
 * https://schema.org/version/3.4/
 *
 * @param schemaVersionValue - a URL specifying a version of schema.org
 * @return The version as a simple string
 */
export function extractSdoVersionNumber(schemaVersionValue: string): string {
  if (schemaVersionValue.includes("schema.org/docs/")) {
    const versionRegex = /.*schema\.org\/docs\/releases\.html#v([0-9.]+)(\/)?/g;
    const match = versionRegex.exec(schemaVersionValue);
    if (match && match[1]) {
      return match[1];
    }
  } else if (schemaVersionValue.includes("schema.org/version/")) {
    const versionRegex = /.*schema\.org\/version\/([0-9.]+)(\/)?/g;
    const match = versionRegex.exec(schemaVersionValue);
    if (match && match[1]) {
      return match[1];
    }
  }
  throw new Error(
    "The given url did not fit the expected format for a schema.org version url."
  );
}
