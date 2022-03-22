import { LanguageTaggedString } from "../../base/types/LanguageTaggedString.type";
import { standardContext } from "../data/standardContext.data";
import { ContextGeneric } from "../../base/types/DsGrammarGeneric.type";
import { dsGrammarNodeTypes } from "../data/dsGrammar.data";
import { DataTypeDsV7 } from "./DataTypesV7.type";

export type ContextV7 = typeof standardContext & ContextGeneric;

// populated DS is the standard type for DS: can have other nodes in @graph besides the root node
export type DsV7 = {
  "@context": ContextV7;
  "@graph": (RootNodeV7 | ClassNodeV7 | EnumerationNodeV7)[];
};

export type DsNodeV7 =
  | DsV7
  | ContextV7
  | RootNodeV7
  | PropertyNodeV7
  | PropertyRangeNodeV7
  | PropertyRangeShNodeV7
  | ClassNodeV7
  | EnumerationNodeV7
  | EnumerationMemberNodeV7
  | ReferenceNodeV7
  | DataTypeNodeV7;

export type RootNodeV7 = {
  "@id": string;
  "@type": "ds:DomainSpecification";
  "ds:subDSOf"?: string;
  "sh:targetClass"?: string[];
  "sh:targetObjectsOf"?: string;
  "sh:targetSubjectsOf"?: string;
  "sh:class": string[];
  "schema:name"?: LanguageTaggedString[];
  "schema:description"?: LanguageTaggedString[];
  "schema:author"?: {
    "@type": "schema:Person";
    "schema:name": string;
    "schema:memberOf"?: {
      "@type": "schema:Organization";
      "schema:name": string;
    };
  };
  "ds:version": "7.0";
  "schema:version"?: string;
  "schema:schemaVersion": string;
  "ds:usedVocabulary"?: string[];
  "sh:closed"?: boolean;
  "ds:propertyDisplayOrder"?: string[];
  "sh:property": PropertyNodeV7[];
};

export type PropertyRangeShNodeV7 = {
  "sh:node": ReferenceNodeV7 | ClassNodeV7 | EnumerationNodeV7;
};

export type PropertyRangeNodeV7 = PropertyRangeShNodeV7 | DataTypeNodeV7;

export type PropertyNodeV7 = {
  "@type": "sh:PropertyShape";
  "sh:order"?: number; // should be integer
  "sh:path": string;
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
  "sh:minCount"?: number;
  "sh:maxCount"?: number;
  "sh:equals"?: string[];
  "sh:disjoint"?: string[];
  "sh:lessThan"?: string[];
  "sh:lessThanOrEquals"?: string[];
  "sh:or": PropertyRangeNodeV7[];
};

// internal, external, root reference
export type ReferenceNodeV7 = {
  "@id": string;
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
};

export type ClassNodeV7 = StandardClassNodeV7 | RestrictedClassNodeV7;

export type StandardClassNodeV7 = {
  "@id": string;
  "@type": "sh:NodeShape";
  "sh:class": string[];
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
};

export type RestrictedClassNodeV7 = {
  "@id": string;
  "@type": "sh:NodeShape";
  "sh:class": string[];
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
  "sh:closed"?: boolean;
  "ds:propertyDisplayOrder"?: string[];
  "sh:property": PropertyNodeV7[];
};

export type EnumerationNodeV7 =
  | StandardEnumerationNodeV7
  | RestrictedEnumerationNodeV7;

export type StandardEnumerationNodeV7 = {
  "@id": string;
  "@type": "sh:NodeShape";
  "sh:class": string[];
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
};

export type RestrictedEnumerationNodeV7 = {
  "@id": string;
  "@type": "sh:NodeShape";
  "sh:class": string[];
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
  "sh:in": EnumerationMemberNodeV7[];
};

export type EnumerationMemberNodeV7 = {
  "@id": string;
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
};

export type DataTypeNodeV7 = {
  "sh:datatype": DataTypeDsV7;
  "rdfs:label"?: LanguageTaggedString[];
  "rdfs:comment"?: LanguageTaggedString[];
  "sh:defaultValue"?: string | number | boolean | LanguageTaggedString;
  "ds:defaultLanguage"?: string;
  "sh:minExclusive"?: string | number;
  "sh:minInclusive"?: string | number;
  "sh:maxExclusive"?: string | number;
  "sh:maxInclusive"?: string | number;
  "sh:minLength"?: number;
  "sh:maxLength"?: number;
  "sh:pattern"?: string[];
  "sh:flags"?: string;
  "sh:languageIn"?: string[];
  "ds:hasLanguage"?: string[];
  "sh:uniqueLang"?: boolean;
  "sh:in"?: (string | number | boolean)[];
  "sh:hasValue"?: (string | number | boolean)[];
};

export type DsGrammarNodeTypeV7 =
  typeof dsGrammarNodeTypes[keyof typeof dsGrammarNodeTypes];
