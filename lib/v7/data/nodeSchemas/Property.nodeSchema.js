"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaProperty = void 0;
exports.nodeSchemaProperty = [
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "sh:PropertyShape"
    },
    {
        term: "sh:order",
        required: false,
        valueType: "integer"
    },
    {
        term: "sh:path",
        required: true,
        valueType: "string"
    },
    {
        term: "rdfs:comment",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:minCount",
        required: false,
        valueType: "integer"
    },
    {
        term: "sh:maxCount",
        required: false,
        valueType: "integer"
    },
    {
        term: "sh:equals",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:disjoint",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:lessThan",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:lessThanOrEquals",
        required: false,
        valueType: "array"
    },
    {
        term: "sh:or",
        required: true,
        valueType: "array"
    }
];
//# sourceMappingURL=Property.nodeSchema.js.map