import { pathGrammarNodeTypes } from "../data/pathGrammar.data";
import { DsGrammarNodeTypeV7 } from "./DsGrammarV7.type";

export type PathGrammarNodeTypeV7 =
  typeof pathGrammarNodeTypes[keyof typeof pathGrammarNodeTypes];

/**
 * This type is used by the function {@link tokenizeDsPath | tokenizeDsPath()} to represent a single path-token.
 *
 * `DsGrammarNodeTypeV7` (type of a DS-Node from the DS-Grammar point of view) can be one of the following:
 * * `DomainSpecification` - the whole [Domain Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification)
 * * `Context` - the [@context](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/context)
 * * `RootNode` - the [root node of the Domain Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification)
 * * `StandardClass` - a [standard class node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/class) (without property restrictions)
 * * `RestrictedClass` - a [restricted class node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/class) (with property restrictions)
 * * `StandardEnumeration` - a [standard enumeration node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/enumeration) (without enumeration member restrictions)
 * * `RestrictedEnumeration` - a [restricted enumeration node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/enumeration) (with enumeration member restrictions)
 * * `Property` - a [property node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/property)
 * * `DataType` - a [datatype node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/datatype)
 * * `EnumerationMember` - an [enumeration member node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/enumeration#3.1.-sh-in)
 * * `RootReference` - an [reference node to the root node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#3.5.-ds-hierarchy)
 * * `InternalReference` - an [reference node to an internal node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#3.5.-ds-hierarchy)
 * * `ExternalReference` - an [reference node to an external node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#3.5.-ds-hierarchy)
 * * `InternalExternalReference` - an [reference node to an internal node of an external node](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#3.5.-ds-hierarchy)
 *
 * `PathGrammarNodeTypeV7` (type of a DS-Node from the DS-Path point of view) can be one of the following:
 * * `RootNode`
 * * `Context`
 * * `InternalReferenceDefinition`
 * * `ExternalReferenceDefinition`
 * * `InternalExternalReferenceDefinition`
 * * `RootReference`
 * * `InternalReference`
 * * `ExternalReference`
 * * `InternalExternalReference`
 * * `Property`
 * * `Class`
 * * `Enumeration`
 * * `DataType`
 *
 * @example
 * ```JS
 * const dsPath = "$.schema:creditText/xsd:string";
 * // a PathTokenObject representing the ".schema:creditText" part would look like this:
 * const dsPathToken2 = {
 *   token: '.schema:creditText',
 *   label: 'creditText',
 *   grammarNodeType: 'Property',
 *   dsPathNodeType: 'Property',
 *   currentPath: '$.schema:creditText',
 *   restPath: '/xsd:string'
 * };
 * ```
 *
 */
export type PathTokenObjectV7 = {
  token: string;
  label: string;
  grammarNodeType: DsGrammarNodeTypeV7;
  dsPathNodeType: PathGrammarNodeTypeV7;
  currentPath: string;
  restPath: string;
};
