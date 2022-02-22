import { ContextGeneric } from "../../base/types/DsGrammarGeneric.type";
import { standardContext } from "../data/standardContext.data";
import { DataTypeDsV5 } from "./DataTypesV5.type";
import { dsGrammarNodeTypes } from "../data/dsGrammar.data";

export type ContextV5 = typeof standardContext & ContextGeneric;

export type DsV5 = {
  "@context": ContextV5;
  "@graph": [RootNodeV5];
  "@id": string;
};

export type DsNodeV5 =
  | DsV5
  | ContextV5
  | RootNodeV5
  | PropertyNodeV5
  | DataTypeNodeV5
  | ClassNodeV5
  | EnumerationNodeV5;

export type RootNodeV5 = {
  "@id"?: string;
  "@type":
    | ["sh:NodeShape", "schema:CreativeWork"]
    | ["schema:CreativeWork", "sh:NodeShape"];
  "sh:targetClass": string | string[];
  "sh:property": PropertyNodeV5[];
  "schema:schemaVersion": string;
  "schema:author"?: {
    "@type": "schema:Person";
    "schema:name": string;
    "schema:memberOf"?: {
      "@type": "schema:Organization";
      "schema:name": string;
    };
  };
  "schema:name"?: string;
  "schema:description"?: string;
  "schema:version"?: number;
  "ds:usedVocabularies"?: string[];
};

export type PropertyNodeV5 = {
  "@type"?: "sh:PropertyShape";
  "sh:path": string;
  "sh:or": (DataTypeNodeV5 | ClassNodeV5 | EnumerationNodeV5)[];
  "sh:minCount"?: number;
  "sh:maxCount"?: number;
  "sh:order"?: number;
  "rdfs:comment"?: string;
  "sh:equals"?: string[];
  "sh:disjoint"?: string[];
  "sh:lessThan"?: string[];
  "sh:lessThanOrEquals"?: string[];
};

export type DataTypeNodeV5 = {
  "sh:datatype": DataTypeDsV5;
  "sh:defaultValue"?: string | number | boolean;
  "sh:minExclusive"?: string | number;
  "sh:minInclusive"?: string | number;
  "sh:maxExclusive"?: string | number;
  "sh:maxInclusive"?: string | number;
  "sh:maxLength"?: number;
  "sh:minLength"?: number;
  "sh:pattern"?: string[];
  "sh:flag"?: string;
  "sh:languageIn"?: string[];
  "sh:uniqueLang"?: boolean;
  "sh:in"?: (string | number | boolean)[];
  "sh:hasValue"?: (string | number | boolean)[];
};

export type ClassNodeV5 = {
  "sh:class": string | string[];
  "sh:node"?: {
    "@type"?: "sh:NodeShape";
    "sh:property": PropertyNodeV5[];
  };
};

export type EnumerationMemberNodeV5 = {
  "@id": string;
};

export type EnumerationNodeV5 = {
  "sh:class": string;
  "sh:in"?: EnumerationMemberNodeV5[];
};

export type DsGrammarNodeTypeV5 =
  typeof dsGrammarNodeTypes[keyof typeof dsGrammarNodeTypes];
