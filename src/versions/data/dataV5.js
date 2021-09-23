/*
 * This file contains data describing the components and structure used by Domain Specifications in DS-V5
 */

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

const standardContext = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  sh: "http://www.w3.org/ns/shacl#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  schema: "http://schema.org/",
  ds: "http://vocab.sti2.at/ds/",
  "ds:usedVocabularies": {
    "@id": "ds:usedVocabularies",
    "@type": "@id",
  },
  "sh:targetClass": {
    "@id": "sh:targetClass",
    "@type": "@id",
  },
  "sh:property": {
    "@id": "sh:property",
  },
  "sh:path": {
    "@id": "sh:path",
    "@type": "@id",
  },
  "sh:datatype": {
    "@id": "sh:datatype",
    "@type": "@id",
  },
  "sh:node": {
    "@id": "sh:node",
  },
  "sh:class": {
    "@id": "sh:class",
    "@type": "@id",
  },
  "sh:or": {
    "@id": "sh:or",
    "@container": "@list",
  },
  "sh:in": {
    "@id": "sh:in",
    "@container": "@list",
  },
  "sh:languageIn": {
    "@id": "sh:languageIn",
    "@container": "@list",
  },
  "sh:equals": {
    "@id": "sh:equals",
    "@type": "@id",
  },
  "sh:disjoint": {
    "@id": "sh:disjoint",
    "@type": "@id",
  },
  "sh:lessThan": {
    "@id": "sh:lessThan",
    "@type": "@id",
  },
  "sh:lessThanOrEquals": {
    "@id": "sh:lessThanOrEquals",
    "@type": "@id",
  },
};

module.exports = {
  nodeTermsDsObject,
  dsNodePropertyOrder,
  standardContext,
};
