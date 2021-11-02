/**
 * Returns the root node of the given DS (reference)
 *
 * @param ds {object} - The input DS
 * @return {object} The detected root node of the DS (reference)
 */
export function getDsRootNodeV7(ds: object): object;
/**
 * Returns the standard @context for DS-V7 (clone - no reference).
 *
 * @return {object} the standard @context for DS-V7
 */
export function getDsStandardContextV7(): object;
/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string} the @id of the given DS
 */
export function getDsIdV7(ds: object): string;
/**
 * Reorders all nodes of the given DS according to the DS specification for DS-V7
 *
 * @param ds {object} - the input DS
 */
export function reorderDsV7(ds: object): void;
/**
 * Reorders the given DS node according to the DS specification for DS-V7. The corresponding node type is detected automatically.
 *
 * @param dsNode
 */
export function reorderDsNodeV7(dsNode: any): void;
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
 * Initializes a DS Path string, based on the given inputs
 *
 * @param [nodeType=RootNode] {string} - the type of the initial token, "RootNode" being the standard. Other possibilities are: "InternalReferenceDefinition", "ExternalReferenceDefinition", "InternalExternalReferenceDefinition"
 * @param [nodeId] {string} - the id of the node which starts the DS path (e.g. "https://semantify.it/ds/_1hRVOT8Q"). Can be left blank in case of "RootNode".
 * @return {string} - the generated DS Path
 */
export function dsPathInitV7(nodeType?: string, nodeId?: string): string;
/**
 * Appends a new token to a given DS Path. The inputs and additions depend on the token type to be added.
 *
 * @param dsPath {string} - the given DS Path to augment
 * @param additionType {string} - the kind of addition to be added
 * @param [inputForPath] {string|string[]} - input that depends on the given additionType, which is used for the dsPath addition
 * @return {string} - the resulting DS Path
 */
export function dsPathAdditionV7(dsPath: string, additionType: string, inputForPath?: string | string[]): string;
/**
 * Returns a node within the given DS based on the given ds-path. (reference)
 *
 * @param ds {object} - The input DS
 * @param dsPath {string} - The input ds-path
 * @return {object} - The node at the given ds-path (reference)
 */
export function dsPathGetNodeV7(ds: object, dsPath: string): object;
/**
 * Returns the type/role of the given DS Node within the given DS
 *
 * @param dsNode {object?} - the input DS Node
 * @param ds {object} - the input DS
 * @return {string} the type of the given node
 */
export function dsPathIdentifyNodeTypeV7(dsNode: object | null, ds: object): string;
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
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS (clone - no reference).
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
export function getDsExternalVocabulariesV7(ds: object): string[];
/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes (empty if none)
 */
export function getDsTargetClassesV7(ds: object): string[];
export namespace nodeTypesV7 {
    export { NODE_TYPE_ROOT };
    export { NODE_TYPE_PROPERTY };
    export { NODE_TYPE_CLASS };
    export { NODE_TYPE_ENUMERATION };
    export { NODE_TYPE_DATATYPE };
    export { NODE_TYPE_REF_ROOT };
    export { NODE_TYPE_REF_INTERNAL };
    export { NODE_TYPE_REF_EXTERNAL };
    export { NODE_TYPE_REF_INTERNAL_EXTERNAL };
    export { NODE_TYPE_DEF_INTERNAL };
    export { NODE_TYPE_DEF_EXTERNAL };
    export { NODE_TYPE_DEF_INTERNAL_EXTERNAL };
}
declare const NODE_TYPE_ROOT: "RootNode";
declare const NODE_TYPE_PROPERTY: "Property";
declare const NODE_TYPE_CLASS: "Class";
declare const NODE_TYPE_ENUMERATION: "Enumeration";
declare const NODE_TYPE_DATATYPE: "DataType";
declare const NODE_TYPE_REF_ROOT: "RootReference";
declare const NODE_TYPE_REF_INTERNAL: "InternalReference";
declare const NODE_TYPE_REF_EXTERNAL: "ExternalReference";
declare const NODE_TYPE_REF_INTERNAL_EXTERNAL: "InternalExternalReference";
declare const NODE_TYPE_DEF_INTERNAL: "InternalReferenceDefinition";
declare const NODE_TYPE_DEF_EXTERNAL: "ExternalReferenceDefinition";
declare const NODE_TYPE_DEF_INTERNAL_EXTERNAL: "InternalExternalReferenceDefinition";
export {};
