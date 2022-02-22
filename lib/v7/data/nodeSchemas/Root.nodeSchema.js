"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaRoot = void 0;
exports.nodeSchemaRoot = [
    {
        term: "@id",
        required: true,
        valueType: "string"
    },
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "ds:DomainSpecification"
    },
    {
        term: "ds:subDSOf",
        required: false,
        valueType: "string"
    },
    {
        term: "sh:targetClass",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:targetObjectsOf",
        required: false,
        valueType: "string"
    },
    {
        term: "sh:targetSubjectsOf",
        required: false,
        valueType: "string"
    },
    {
        term: "sh:class",
        required: false,
        valueType: "array"
    },
    {
        term: "schema:name",
        required: false,
        valueType: "array"
    },
    {
        term: "schema:description",
        required: false,
        valueType: "array"
    },
    {
        term: "schema:author",
        required: false,
        valueType: "object"
    },
    {
        term: "ds:version",
        required: true,
        valueType: "string"
    },
    {
        term: "schema:version",
        required: false,
        valueType: "string"
    },
    {
        term: "schema:schemaVersion",
        required: true,
        valueType: "string"
    },
    {
        term: "ds:usedVocabulary",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:closed",
        required: false,
        valueType: "boolean"
    },
    {
        term: "ds:propertyDisplayOrder",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:property",
        required: true,
        valueType: "array"
    }
];
//# sourceMappingURL=Root.nodeSchema.js.map