"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaDataType = void 0;
exports.nodeSchemaDataType = [
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
//# sourceMappingURL=DataType.nodeSchema.js.map