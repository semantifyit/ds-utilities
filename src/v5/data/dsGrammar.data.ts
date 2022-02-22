const dsGrammarNodeTypeDs = "DomainSpecification";
const dsGrammarNodeTypeContext = "Context";
const dsGrammarNodeTypeRoot = "RootNode"; // root node
const dsGrammarNodeTypeClass = "Class"; // can have sh:property
const dsGrammarNodeTypeEnumeration = "Enumeration"; // can have sh:in
const dsGrammarNodeTypeProperty = "Property";
const dsGrammarNodeTypeDataType = "DataType";
const dsGrammarNodeTypeEnumerationMember = "EnumerationMember";

export const dsGrammarNodeTypes = {
  ds: dsGrammarNodeTypeDs,
  context: dsGrammarNodeTypeContext,
  root:dsGrammarNodeTypeRoot,
  class: dsGrammarNodeTypeClass,
  enumeration: dsGrammarNodeTypeEnumeration,
  property: dsGrammarNodeTypeProperty,
  dataType: dsGrammarNodeTypeDataType,
  enumerationMember: dsGrammarNodeTypeEnumerationMember,
} as const;

// todo this can be expanded and reorder function could be provided
// These are the terms used by a DS Object for DS-V5, listed in the recommended order as they should be listed in their lexical representation
const nodeTermsDsObject = [
  {
    term: "@context",
    required: true,
    valueType: "object",
  },
  {
    term: "@graph",
    required: true,
    valueType: "array",
  },
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
];

const dsNodePropertyOrder = [
  "@context",
  "@graph",
  "@id",
  "@type",
  "@language",
  "@value",
  "sh:targetClass",
  "sh:targetObjectsOf",
  "sh:targetSubjectsOf",
  "sh:class",
  "sh:datatype",
  "schema:name",
  "schema:description",
  "schema:author",
  "rdfs:comment",
  "schema:version",
  "schema:schemaVersion",
  "ds:usedVocabularies",
  "sh:closed",
  "sh:order",
  "sh:path",
  "sh:minCount",
  "sh:maxCount",
  "sh:equals",
  "sh:disjoint",
  "sh:lessThan",
  "sh:lessThanOrEquals",
  "sh:defaultValue",
  "ds:defaultLanguage",
  "sh:minExclusive",
  "sh:minInclusive",
  "sh:maxExclusive",
  "sh:maxInclusive",
  "sh:minLength",
  "sh:maxLength",
  "sh:pattern",
  "sh:flag",
  "sh:languageIn",
  "ds:hasLanguage",
  "sh:uniqueLang",
  "sh:in",
  "sh:hasValue",
  "sh:property",
  "sh:or",
  "sh:node",
];