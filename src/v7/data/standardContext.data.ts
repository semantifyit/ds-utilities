import { ContextGeneric } from "../../base/types/DsGrammarGeneric.type";

export const standardContext: ContextGeneric = {
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
} as const;