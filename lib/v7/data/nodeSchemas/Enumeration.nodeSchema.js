"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaEnumeration = void 0;
exports.nodeSchemaEnumeration = [
    {
        term: "@id",
        required: true,
        valueType: "string",
    },
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "sh:NodeShape",
    },
    {
        term: "sh:class",
        required: true,
        valueType: "array",
    },
    {
        term: "sh:in",
        required: false,
        valueType: "array",
    },
];
//# sourceMappingURL=Enumeration.nodeSchema.js.map