export const pathGrammarNodeTypeContext = "Context"; // "@context" is a special dsPath that points to the @context object of the DS - possible start
export const pathGrammarNodeTypeRoot = "RootNode"; // possible start
export const pathGrammarNodeTypeDefinitionInternal = "InternalReferenceDefinition";// possible start
export const pathGrammarNodeTypeDefinitionExternal = "ExternalReferenceDefinition";// possible start
export const pathGrammarNodeTypeDefinitionInternalExternal = "InternalExternalReferenceDefinition";// possible start

// these are references, although they point to a reference object, e.g. { "@id": "xyz" }, the path functions CAN return the referenced entity instead of the reference object (optional as parameter)
export const pathGrammarNodeTypeReferenceRoot = "RootReference";
export const pathGrammarNodeTypeReferenceInternal = "InternalReference";
export const pathGrammarNodeTypeReferenceExternal = "ExternalReference";
export const pathGrammarNodeTypeReferenceInternalExternal = "InternalExternalReference";

export const pathGrammarNodeTypeProperty = "Property";
export const pathGrammarNodeTypeClass = "Class";
export const pathGrammarNodeTypeEnumeration = "Enumeration";
// add ds path node type for enumeration member (which is in sh:in)? .schema:dayOfWeek/schema:DayOfWeek::schema:Friday ? such a node has no interesting information though, it is only a reference, e.g. { "@id": "schema:Friday" }
export const pathGrammarNodeTypeDataType = "DataType";


export const pathGrammarNodeTypes = {
  context: pathGrammarNodeTypeContext,
  root: pathGrammarNodeTypeRoot,
  defInt: pathGrammarNodeTypeDefinitionInternal,
  defExt: pathGrammarNodeTypeDefinitionExternal,
  defIntExt: pathGrammarNodeTypeDefinitionInternalExternal,
  refRoot: pathGrammarNodeTypeReferenceRoot,
  refInt: pathGrammarNodeTypeReferenceInternal,
  refExt: pathGrammarNodeTypeReferenceExternal,
  refIntExt: pathGrammarNodeTypeReferenceInternalExternal,
  property: pathGrammarNodeTypeProperty,
  class: pathGrammarNodeTypeClass,
  enumeration: pathGrammarNodeTypeEnumeration,
  dataType: pathGrammarNodeTypeDataType
} as const;