"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaClass = void 0;
exports.nodeSchemaClass = [
    {
        term: "@id",
        required: true,
        valueType: "string"
    },
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "sh:NodeShape"
    },
    {
        term: "sh:class",
        required: true,
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
        required: false,
        valueType: "array"
    }
];
//# sourceMappingURL=Class.nodeSchema.js.map