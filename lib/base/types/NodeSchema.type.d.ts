export declare type NodeSchemaValueType = "string" | "number" | "integer" | "object" | "array" | "boolean" | "any" | "languageTaggedString";
export declare type NodeSchemaValueTypeArray = `${NodeSchemaValueType}[]`;
export declare type NodeSchemaEntry = {
    term: string;
    required: boolean;
    valueType: NodeSchemaValueType | NodeSchemaValueTypeArray | (NodeSchemaValueType | NodeSchemaValueTypeArray)[];
    value?: any;
    valueIn?: any[];
};
export declare type NodeSchema = NodeSchemaEntry[];
//# sourceMappingURL=NodeSchema.type.d.ts.map