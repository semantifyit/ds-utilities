/**
 * Extracts the schema.org version number (as string) from the given schema.org version URL.
 *
 * This function accepts URLs with following formats (any protocol variant is allowed - http/https):
 * * `"https://schema.org/docs/releases.html#v10.0"` -> `"10.0"`
 * * `"https://schema.org/version/3.4/"` -> `"3.4"`
 *
 * @example
 * ```JS
 * myDsUtilities.extractSdoVersionNumber("https://schema.org/version/12.0/");
 * // "12.0"
 * ```
 *
 * @param schemaVersionValue - a URL specifying a schema.org version
 * @return The version number as a string
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
