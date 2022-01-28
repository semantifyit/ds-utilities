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
export namespace dsGrammarNodeTypesV7 {
    export { DS_GRAMMAR_NODE_TYPE_CONTEXT };
    export { DS_GRAMMAR_NODE_TYPE_ROOT };
    export { DS_GRAMMAR_NODE_TYPE_CLASS_S };
    export { DS_GRAMMAR_NODE_TYPE_CLASS_R };
    export { DS_GRAMMAR_NODE_TYPE_ENUMERATION_S };
    export { DS_GRAMMAR_NODE_TYPE_ENUMERATION_R };
    export { DS_GRAMMAR_NODE_TYPE_PROPERTY };
    export { DS_GRAMMAR_NODE_TYPE_DATATYPE };
    export { DS_GRAMMAR_NODE_TYPE_ENUMERATIONMEMBER };
}
export namespace dsPathNodeTypesV7 {
    export { DS_PATH_NODE_TYPE_CONTEXT };
    export { DS_PATH_NODE_TYPE_ROOT };
    export { DS_PATH_NODE_TYPE_PROPERTY };
    export { DS_PATH_NODE_TYPE_CLASS };
    export { DS_PATH_NODE_TYPE_ENUMERATION };
    export { DS_PATH_NODE_TYPE_DATATYPE };
    export { DS_PATH_NODE_TYPE_REF_ROOT };
    export { DS_PATH_NODE_TYPE_REF_INTERNAL };
    export { DS_PATH_NODE_TYPE_REF_EXTERNAL };
    export { DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL };
    export { DS_PATH_NODE_TYPE_DEF_INTERNAL };
    export { DS_PATH_NODE_TYPE_DEF_EXTERNAL };
    export { DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL };
}
export const dataTypeMappingToSchema: {
    "xsd:string": string;
    "rdf:langString": string;
    "rdf:HTML": string;
    "xsd:boolean": string;
    "xsd:date": string;
    "xsd:dateTime": string;
    "xsd:time": string;
    "xsd:double": string;
    "xsd:integer": string;
    "xsd:float": string;
    "xsd:anyURI": string;
};
export const dataTypeMappingToLabel: {
    "xsd:string": string;
    "rdf:langString": string;
    "rdf:HTML": string;
    "xsd:boolean": string;
    "xsd:date": string;
    "xsd:dateTime": string;
    "xsd:time": string;
    "xsd:double": string;
    "xsd:integer": string;
    "xsd:float": string;
    "xsd:anyURI": string;
};
declare const DS_GRAMMAR_NODE_TYPE_CONTEXT: "Context";
declare const DS_GRAMMAR_NODE_TYPE_ROOT: "RootNode";
declare const DS_GRAMMAR_NODE_TYPE_CLASS_S: "StandardClass";
declare const DS_GRAMMAR_NODE_TYPE_CLASS_R: "RestrictedClass";
declare const DS_GRAMMAR_NODE_TYPE_ENUMERATION_S: "StandardEnumeration";
declare const DS_GRAMMAR_NODE_TYPE_ENUMERATION_R: "RestrictedEnumeration";
declare const DS_GRAMMAR_NODE_TYPE_PROPERTY: "Property";
declare const DS_GRAMMAR_NODE_TYPE_DATATYPE: "DataType";
declare const DS_GRAMMAR_NODE_TYPE_ENUMERATIONMEMBER: "EnumerationMember";
declare const DS_PATH_NODE_TYPE_CONTEXT: "Context";
declare const DS_PATH_NODE_TYPE_ROOT: "RootNode";
declare const DS_PATH_NODE_TYPE_PROPERTY: "Property";
declare const DS_PATH_NODE_TYPE_CLASS: "Class";
declare const DS_PATH_NODE_TYPE_ENUMERATION: "Enumeration";
declare const DS_PATH_NODE_TYPE_DATATYPE: "DataType";
declare const DS_PATH_NODE_TYPE_REF_ROOT: "RootReference";
declare const DS_PATH_NODE_TYPE_REF_INTERNAL: "InternalReference";
declare const DS_PATH_NODE_TYPE_REF_EXTERNAL: "ExternalReference";
declare const DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL: "InternalExternalReference";
declare const DS_PATH_NODE_TYPE_DEF_INTERNAL: "InternalReferenceDefinition";
declare const DS_PATH_NODE_TYPE_DEF_EXTERNAL: "ExternalReferenceDefinition";
declare const DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL: "InternalExternalReferenceDefinition";
export {};
