/**
 * Returns the root node of the given DS. (reference)
 *
 * @param ds {object} - The input DS
 * @return {object} - The detected root node of the DS (reference)
 */
export function getDsRootNodeV5(ds: object): object;
/**
 * Returns the standard @context for DS-V5 (clone - no reference).
 *
 * @return {object} - the standard @context for DS-V5
 */
export function getDsStandardContextV5(): object;
/**
 * Returns the @id of the given DS (for DS-V5 this @id is found in the outermost object).
 * A DS @id is mandatory for DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string} - the @id of the given DS
 */
export function getDsIdV5(ds: object): string;
/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the name of the given DS
 */
export function getDsNameV5(ds: object): string | null;
/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the description of the given DS
 */
export function getDsDescriptionV5(ds: object): string | null;
/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the author name of the given DS
 */
export function getDsAuthorV5(ds: object): string | null;
/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string} the schema.org version identifier as simple string, e.g. "11.0"
 */
export function getDsSchemaVersionV5(ds: object): string;
/**
 * Returns the version (schema:version) of the given DS.
 * schema:version is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the ds version as simple string, e.g. "1.04"
 */
export function getDsVersionV5(ds: object): string | null;
/**
 * Returns the used external vocabularies (ds:usedVocabularies) of the given DS (clone - no reference).
 * ds:usedVocabularies is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabulariesV5(ds: object): string[];
/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes
 */
export function getDsTargetClassesV5(ds: object): string[];
