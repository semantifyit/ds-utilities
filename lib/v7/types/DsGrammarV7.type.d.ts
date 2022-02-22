import { LanguageTaggedString } from "../../base/types/LanguageTaggedString.type";
import { standardContext } from "../data/standardContext.data";
import { ContextGeneric } from "../../base/types/DsGrammarGeneric.type";
import { dsGrammarNodeTypes } from "../data/dsGrammar.data";
import { DataTypeDsV7 } from "./DataTypesV7.type";
export declare type ContextV7 = (typeof standardContext) & ContextGeneric;
export declare type DsV7 = {
    "@context": ContextV7;
    "@graph": (RootNodeV7 | ClassNodeV7 | EnumerationNodeV7)[];
};
export declare type DsV7Unpopulated = {
    "@context": ContextV7;
    "@graph": [
        RootNodeV7
    ];
};
export declare type DsNodeV7 = DsV7 | ContextV7 | RootNodeV7 | PropertyNodeV7 | PropertyRangeNodeV7 | ClassNodeV7 | EnumerationNodeV7 | EnumerationMemberNodeV7 | ReferenceNodeV7 | DataTypeNodeV7;
export declare type RootNodeV7 = {
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
export declare type PropertyRangeNodeV7 = {
    "sh:node": ReferenceNodeV7 | ClassNodeV7 | EnumerationNodeV7;
} | DataTypeNodeV7;
export declare type PropertyNodeV7 = {
    "@type": "sh:PropertyShape";
    "sh:order"?: number;
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
export declare type ReferenceNodeV7 = {
    "@id": string;
    "rdfs:label"?: LanguageTaggedString[];
    "rdfs:comment"?: LanguageTaggedString[];
};
export declare type ClassNodeV7 = StandardClassNodeV7 | RestrictedClassNodeV7;
export declare type StandardClassNodeV7 = {
    "@id": string;
    "@type": "sh:NodeShape";
    "sh:class": string[];
    "rdfs:label"?: LanguageTaggedString[];
    "rdfs:comment"?: LanguageTaggedString[];
};
export declare type RestrictedClassNodeV7 = {
    "@id": string;
    "@type": "sh:NodeShape";
    "sh:class": string[];
    "rdfs:label"?: LanguageTaggedString[];
    "rdfs:comment"?: LanguageTaggedString[];
    "sh:closed"?: boolean;
    "ds:propertyDisplayOrder"?: string[];
    "sh:property": PropertyNodeV7[];
};
export declare type EnumerationNodeV7 = StandardEnumerationNodeV7 | RestrictedEnumerationNodeV7;
export declare type StandardEnumerationNodeV7 = {
    "@id": string;
    "@type": "sh:NodeShape";
    "sh:class": string[];
    "rdfs:label"?: LanguageTaggedString[];
    "rdfs:comment"?: LanguageTaggedString[];
};
export declare type RestrictedEnumerationNodeV7 = {
    "@id": string;
    "@type": "sh:NodeShape";
    "sh:class": string[];
    "rdfs:label"?: LanguageTaggedString[];
    "rdfs:comment"?: LanguageTaggedString[];
    "sh:in": EnumerationMemberNodeV7[];
};
export declare type EnumerationMemberNodeV7 = {
    "@id": string;
    "rdfs:label"?: LanguageTaggedString[];
    "rdfs:comment"?: LanguageTaggedString[];
};
export declare type DataTypeNodeV7 = {
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
    "sh:flag"?: string;
    "sh:languageIn"?: string[];
    "ds:hasLanguage"?: string[];
    "sh:uniqueLang"?: boolean;
    "sh:in"?: (string | number | boolean)[];
    "sh:hasValue"?: (string | number | boolean)[];
};
export declare type DsGrammarNodeTypeV7 = typeof dsGrammarNodeTypes[keyof typeof dsGrammarNodeTypes];
//# sourceMappingURL=DsGrammarV7.type.d.ts.map