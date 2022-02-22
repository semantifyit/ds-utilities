"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semantifyConfig = void 0;
exports.semantifyConfig = {
    nodeSchemaRoot: [
        {
            term: "sh:targetClass",
            required: true,
            valueType: "array"
        },
        {
            term: "sh:class",
            required: true,
            valueType: "array"
        },
        {
            term: "schema:name",
            required: true,
            valueType: "array"
        },
        {
            term: "schema:author",
            required: true,
            valueType: "object"
        },
        {
            term: "schema:version",
            required: true,
            valueType: "string"
        },
        {
            term: "sh:closed",
            required: true,
            valueType: "boolean"
        }
    ],
    nodeSchemaClass: [
        {
            term: "sh:closed",
            required: true,
            valueType: "boolean"
        }
    ]
};
//# sourceMappingURL=Semantify.nodeSchema.js.map