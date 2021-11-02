export const nodeTermsDsObject: {
    term: string;
    required: boolean;
    valueType: string;
}[];
export function nodeTermsContext(): {
    term: string;
    required: boolean;
}[];
export const nodeTermsRootNode: ({
    term: string;
    required: boolean;
    valueType: string;
    value?: undefined;
} | {
    term: string;
    required: boolean;
    valueType: string;
    value: string;
})[];
export const nodeTermsPropertyNode: ({
    term: string;
    required: boolean;
    valueType: string;
    value: string;
} | {
    term: string;
    required: boolean;
    valueType: string;
    value?: undefined;
})[];
export const nodeTermsClassNode: ({
    term: string;
    required: boolean;
    valueType: string;
    value?: undefined;
} | {
    term: string;
    required: boolean;
    valueType: string;
    value: string;
})[];
export const nodeTermsEnumerationNode: ({
    term: string;
    required: boolean;
    valueType: string;
    value?: undefined;
} | {
    term: string;
    required: boolean;
    valueType: string;
    value: string;
})[];
export const nodeTermsDataTypeNode: ({
    term: string;
    required: boolean;
    valueType: string;
    valueIn: string[];
} | {
    term: string;
    required: boolean;
    valueType: string;
    valueIn?: undefined;
})[];
export const nodeTermsLanguageTaggedValue: {
    term: string;
    required: boolean;
    valueType: string;
}[];
export const standardContext: {
    ds: string;
    rdf: string;
    rdfs: string;
    schema: string;
    sh: string;
    xsd: string;
    "ds:propertyDisplayOrder": {
        "@container": string;
        "@type": string;
    };
    "ds:subDSOf": {
        "@type": string;
    };
    "ds:usedVocabulary": {
        "@type": string;
    };
    "sh:targetClass": {
        "@type": string;
    };
    "sh:targetObjectsOf": {
        "@type": string;
    };
    "sh:targetSubjectsOf": {
        "@type": string;
    };
    "sh:class": {
        "@type": string;
    };
    "sh:path": {
        "@type": string;
    };
    "sh:datatype": {
        "@type": string;
    };
    "sh:equals": {
        "@type": string;
    };
    "sh:disjoint": {
        "@type": string;
    };
    "sh:lessThan": {
        "@type": string;
    };
    "sh:lessThanOrEquals": {
        "@type": string;
    };
    "sh:in": {
        "@container": string;
    };
    "sh:languageIn": {
        "@container": string;
    };
    "sh:or": {
        "@container": string;
    };
};
