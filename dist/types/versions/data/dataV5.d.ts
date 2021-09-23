export const nodeTermsDsObject: {
    term: string;
    required: boolean;
    valueType: string;
}[];
export const dsNodePropertyOrder: string[];
export const standardContext: {
    rdf: string;
    rdfs: string;
    sh: string;
    xsd: string;
    schema: string;
    ds: string;
    "ds:usedVocabularies": {
        "@id": string;
        "@type": string;
    };
    "sh:targetClass": {
        "@id": string;
        "@type": string;
    };
    "sh:property": {
        "@id": string;
    };
    "sh:path": {
        "@id": string;
        "@type": string;
    };
    "sh:datatype": {
        "@id": string;
        "@type": string;
    };
    "sh:node": {
        "@id": string;
    };
    "sh:class": {
        "@id": string;
        "@type": string;
    };
    "sh:or": {
        "@id": string;
        "@container": string;
    };
    "sh:in": {
        "@id": string;
        "@container": string;
    };
    "sh:languageIn": {
        "@id": string;
        "@container": string;
    };
    "sh:equals": {
        "@id": string;
        "@type": string;
    };
    "sh:disjoint": {
        "@id": string;
        "@type": string;
    };
    "sh:lessThan": {
        "@id": string;
        "@type": string;
    };
    "sh:lessThanOrEquals": {
        "@id": string;
        "@type": string;
    };
};
