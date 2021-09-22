/**
 * Returns the root node of the given DS
 *
 * @param ds {object} - The input DS
 * @return {object} The detected root node of the DS
 */
export function getDsRootNodeV7(ds: object): object;
/**
 * Returns the standard @context for DS-V7
 *
 * @return {object} the standard @context for DS-V7
 */
export function getDsStandardContextV7(): object;
/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds  {object} - the input DS
 * @return {string} the @id of the given DS
 */
export function getDsIdV7(ds: object): string;
/**
 * Creates a new fragment id according to the DS-V7 specification.
 * See https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape
 * It is possible to pass the current DS, this way it is ensured that the generated fragment id has not been used yet in the given DS
 *
 * @param {object} ds - the input DS (optional)
 * @return {string} returns a new the fragment id
 */
export function generateInnerNodeIdV7(ds?: object): string;
/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the name (optional)
 * @return {?string} the name of the given DS
 */
export function getDsNameV7(ds: object, language?: string | null): string | null;
/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the description (optional)
 * @return {?string} the description of the given DS
 */
export function getDsDescriptionV7(ds: object, language?: string | null): string | null;
/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {?string} the author name of the given DS
 */
export function getDsAuthorNameV7(ds: object): string | null;
/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string} the schema.org version identifier as simple string, e.g. "11.0"
 */
export function getDsSchemaVersionV7(ds: object): string;
/**
 * Returns the used ds version (schema:version) of the given DS.
 * schema:version is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {?string} the ds version as simple string, e.g. "1.04"
 */
export function getDsVersionV7(ds: object): string | null;
/**
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS.
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabulariesV7(ds: object): string[];
/**
 * Returns the target classes (sh:targetClass) of the given DS.
 * sh:targetClass is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes (empty if none)
 */
export function getDsTargetClassesV7(ds: object): string[];
