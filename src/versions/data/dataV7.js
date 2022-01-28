/*
 * This file contains data describing the components and structure used by Domain Specifications in DS-V7
 */

// These are the terms used by a DS Object for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
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
];

// These are the terms used by the @context for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
// This list is dynamically built out of the standard @context
const nodeTermsContext = () => {
  const result = [];
  for (const t of Object.keys(standardContext)) {
    const entry = {
      term: t,
      required: true,
    };
    if (typeof standardContext[t] === "string") {
      entry.valueType = "string";
    } else {
      entry.valueType = "object";
    }
    entry.value = standardContext[t];
    result.push(entry);
  }
  return result;
};

// These are the terms used by a DS Root node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsRootNode = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "ds:DomainSpecification",
  },
  {
    term: "ds:subDSOf",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:targetClass",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:targetObjectsOf",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:targetSubjectsOf",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:class",
    required: false,
    valueType: "array",
  },
  {
    term: "schema:name",
    required: false,
    valueType: "array",
  },
  {
    term: "schema:description",
    required: false,
    valueType: "array",
  },
  {
    term: "schema:author",
    required: false,
    valueType: "object",
  },
  {
    term: "ds:version",
    required: true,
    valueType: "string",
  },
  {
    term: "schema:version",
    required: false,
    valueType: "string",
  },
  {
    term: "schema:schemaVersion",
    required: true,
    valueType: "string",
  },
  {
    term: "ds:usedVocabulary",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:closed",
    required: false,
    valueType: "boolean",
  },
  {
    term: "ds:propertyDisplayOrder",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:property",
    required: true,
    valueType: "array",
  },
];

// These are the terms used by a property node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsPropertyNode = [
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:PropertyShape",
  },
  {
    term: "sh:order",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:path",
    required: true,
    valueType: "string",
  },
  {
    term: "rdfs:comment",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:minCount",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:maxCount",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:equals",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:disjoint",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:lessThan",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:lessThanOrEquals",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:or",
    required: true,
    valueType: "array",
  },
];

// These are the terms used by a Class node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsClassNode = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:NodeShape",
  },
  {
    term: "sh:class",
    required: true,
    valueType: "array",
  },
  {
    term: "sh:closed",
    required: false,
    valueType: "boolean",
  },
  {
    term: "ds:propertyDisplayOrder",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:property",
    required: false,
    valueType: "array",
  },
];

// These are the terms used by an enumeration node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsEnumerationNode = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:NodeShape",
  },
  {
    term: "sh:class",
    required: true,
    valueType: "array",
  },
  {
    term: "sh:in",
    required: false,
    valueType: "array",
  },
];

// These are the terms used by a data type node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsDataTypeNode = [
  {
    term: "sh:datatype",
    required: true,
    valueType: "string",
    valueIn: [
      "xsd:string",
      "rdf:langString",
      "rdf:HTML",
      "xsd:boolean",
      "xsd:date",
      "xsd:dateTime",
      "xsd:time",
      "xsd:double",
      "xsd:integer",
      "xsd:float",
      "xsd:anyURI",
    ],
  },
  {
    term: "sh:defaultValue",
    required: false,
    valueType: "any",
  },
  {
    term: "ds:defaultLanguage",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:minExclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:minInclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:maxExclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:maxInclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:minLength",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:maxLength",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:pattern",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:flag",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:languageIn",
    required: false,
    valueType: "array",
  },
  {
    term: "ds:hasLanguage",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:uniqueLang",
    required: false,
    valueType: "boolean",
  },
  {
    term: "sh:in",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:hasValue",
    required: false,
    valueType: "array",
  },
];

// These are the terms used by a language tagged value for DS-V7 (e.g. value of schema:name)
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsLanguageTaggedValue = [
  {
    term: "@language",
    required: true,
    valueType: "string",
  },
  {
    term: "@value",
    required: true,
    valueType: "string",
  },
];

const standardContext = {
  ds: "https://vocab.sti2.at/ds/",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  schema: "https://schema.org/",
  sh: "http://www.w3.org/ns/shacl#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  "ds:propertyDisplayOrder": {
    "@container": "@list",
    "@type": "@id",
  },
  "ds:subDSOf": {
    "@type": "@id",
  },
  "ds:usedVocabulary": {
    "@type": "@id",
  },
  "sh:targetClass": {
    "@type": "@id",
  },
  "sh:targetObjectsOf": {
    "@type": "@id",
  },
  "sh:targetSubjectsOf": {
    "@type": "@id",
  },
  "sh:class": {
    "@type": "@id",
  },
  "sh:path": {
    "@type": "@id",
  },
  "sh:datatype": {
    "@type": "@id",
  },
  "sh:equals": {
    "@type": "@id",
  },
  "sh:disjoint": {
    "@type": "@id",
  },
  "sh:lessThan": {
    "@type": "@id",
  },
  "sh:lessThanOrEquals": {
    "@type": "@id",
  },
  "sh:in": {
    "@container": "@list",
  },
  "sh:languageIn": {
    "@container": "@list",
  },
  "sh:or": {
    "@container": "@list",
  },
};

const DS_GRAMMAR_NODE_TYPE_CONTEXT = "Context";
const DS_GRAMMAR_NODE_TYPE_ROOT = "RootNode"; // root node
const DS_GRAMMAR_NODE_TYPE_CLASS_S = "StandardClass"; // has no sh:property
const DS_GRAMMAR_NODE_TYPE_CLASS_R = "RestrictedClass"; // has sh:property
const DS_GRAMMAR_NODE_TYPE_ENUMERATION_S = "StandardEnumeration"; // has no sh:in
const DS_GRAMMAR_NODE_TYPE_ENUMERATION_R = "RestrictedEnumeration"; // has sh:in
const DS_GRAMMAR_NODE_TYPE_PROPERTY = "Property";
const DS_GRAMMAR_NODE_TYPE_DATATYPE = "DataType";
const DS_GRAMMAR_NODE_TYPE_ENUMERATIONMEMBER = "EnumerationMember";

const dsGrammarNodeTypesV7 = {
  DS_GRAMMAR_NODE_TYPE_CONTEXT,
  DS_GRAMMAR_NODE_TYPE_ROOT,
  DS_GRAMMAR_NODE_TYPE_CLASS_S,
  DS_GRAMMAR_NODE_TYPE_CLASS_R,
  DS_GRAMMAR_NODE_TYPE_ENUMERATION_S,
  DS_GRAMMAR_NODE_TYPE_ENUMERATION_R,
  DS_GRAMMAR_NODE_TYPE_PROPERTY,
  DS_GRAMMAR_NODE_TYPE_DATATYPE,
  DS_GRAMMAR_NODE_TYPE_ENUMERATIONMEMBER,
};

const DS_PATH_NODE_TYPE_CONTEXT = "Context"; // "@context" is a special dsPath that points to the @context object of the DS - possible start
const DS_PATH_NODE_TYPE_ROOT = "RootNode"; // possible start
const DS_PATH_NODE_TYPE_DEF_INTERNAL = "InternalReferenceDefinition"; // possible start
const DS_PATH_NODE_TYPE_DEF_EXTERNAL = "ExternalReferenceDefinition"; // possible start
const DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL =
  "InternalExternalReferenceDefinition"; // possible start

const DS_PATH_NODE_TYPE_PROPERTY = "Property";
const DS_PATH_NODE_TYPE_CLASS = "Class";
const DS_PATH_NODE_TYPE_ENUMERATION = "Enumeration";
// add ds path node type for enumeration member (which is in sh:in)? .schema:dayOfWeek/schema:DayOfWeek::schema:Friday ? such a node has no interesting information though, it is only a reference, e.g. { "@id": "schema:Friday" }
const DS_PATH_NODE_TYPE_DATATYPE = "DataType";

// these are references, although they point to a reference object, e.g. { "@id": "xyz" }, the path functions return the referenced entity instead of the reference object
const DS_PATH_NODE_TYPE_REF_ROOT = "RootReference";
const DS_PATH_NODE_TYPE_REF_INTERNAL = "InternalReference";
const DS_PATH_NODE_TYPE_REF_EXTERNAL = "ExternalReference";
const DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL = "InternalExternalReference";

const dsPathNodeTypesV7 = {
  DS_PATH_NODE_TYPE_CONTEXT,
  DS_PATH_NODE_TYPE_ROOT,
  DS_PATH_NODE_TYPE_PROPERTY,
  DS_PATH_NODE_TYPE_CLASS,
  DS_PATH_NODE_TYPE_ENUMERATION,
  DS_PATH_NODE_TYPE_DATATYPE,
  DS_PATH_NODE_TYPE_REF_ROOT,
  DS_PATH_NODE_TYPE_REF_INTERNAL,
  DS_PATH_NODE_TYPE_REF_EXTERNAL,
  DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL,
  DS_PATH_NODE_TYPE_DEF_INTERNAL,
  DS_PATH_NODE_TYPE_DEF_EXTERNAL,
  DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL,
};

// https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/datatype#3.1.-datatype-mapping
const dataTypeMappingToSchema = {
  "xsd:string": "schema:Text",
  "rdf:langString": "schema:Text",
  "rdf:HTML": "schema:Text",
  "xsd:boolean": "schema:Boolean",
  "xsd:date": "schema:Date",
  "xsd:dateTime": "schema:DateTime",
  "xsd:time": "schema:Time",
  "xsd:double": "schema:Number",
  "xsd:integer": "schema:Integer",
  "xsd:float": "schema:Float",
  "xsd:anyURI": "schema:URL",
};

const dataTypeMappingToLabel = {
  "xsd:string": "Text",
  "rdf:langString": "Localized Text",
  "rdf:HTML": "HTML Text",
  "xsd:boolean": "Boolean",
  "xsd:date": "Date",
  "xsd:dateTime": "DateTime",
  "xsd:time": "Time",
  "xsd:double": "Number",
  "xsd:integer": "Integer",
  "xsd:float": "Float",
  "xsd:anyURI": "URL",
};

module.exports = {
  nodeTermsDsObject,
  nodeTermsContext,
  nodeTermsRootNode,
  nodeTermsPropertyNode,
  nodeTermsClassNode,
  nodeTermsEnumerationNode,
  nodeTermsDataTypeNode,
  nodeTermsLanguageTaggedValue,
  standardContext,
  dsGrammarNodeTypesV7,
  dsPathNodeTypesV7,
  dataTypeMappingToSchema,
  dataTypeMappingToLabel,
};
