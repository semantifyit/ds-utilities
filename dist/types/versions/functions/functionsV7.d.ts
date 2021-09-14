/**
 * Returns the root node of the given DS
 *
 * @param ds {object} - The input DS
 * @return {object} - The detected root node of the DS
 */
export function getDsRootNodeV7(ds: object): object;
/**
 * Returns the standard @context for DS-V7
 *
 * @return {object} - the standard @context for DS-V7
 */
export function getDsStandardContextV7(): object;
/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds  {object} - the input DS
 * @return {string} - the @id of the given DS
 */
export function getDsIdV7(ds: object): string;
/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the name (optional)
 * @return {string|undefined} - the name of the given DS
 */
export function getDsNameV7(ds: object, language?: string | null): string | undefined;
/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the description (optional)
 * @return {string|undefined} - the description of the given DS
 */
export function getDsDescriptionV7(ds: object, language?: string | null): string | undefined;
/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string|undefined} - the author name of the given DS
 */
export function getDsAuthorNameV7(ds: object): string | undefined;
/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string|undefined} - the schema.org version identifier as simple string, e.g. "11.0"
 */
export function getDsSchemaVersionV7(ds: object): string | undefined;
/**
 * Returns the used ds version (schema:version) of the given DS.
 * schema:version is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string|undefined} - the ds version as simple string, e.g. "1.04"
 */
export function getDsVersionV7(ds: object): string | undefined;
/**
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS.
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} - array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabulariesV7(ds: object): string[];
