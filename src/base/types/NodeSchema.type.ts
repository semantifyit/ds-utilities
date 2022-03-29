export type NodeSchemaValueType =
  | "string"
  | "number"
  | "integer"
  | "object"
  | "array"
  | "boolean"
  | "any"
  | "languageTaggedString";

export type NodeSchemaValueTypeArray = `${NodeSchemaValueType}[]`;

export type NodeSchemaEntry = {
  term: string;
  required: boolean;
  valueType:
    | NodeSchemaValueType
    | NodeSchemaValueTypeArray
    | (NodeSchemaValueType | NodeSchemaValueTypeArray)[];
  value?: any;
  valueIn?: any[];
};

export type NodeSchema = NodeSchemaEntry[];
