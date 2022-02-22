import { dataTypesSchema, dataTypesDs } from "../data/datatypes.data";

export type DataTypeDsV5 = typeof dataTypesDs[keyof typeof dataTypesDs];
export type DataTypeSchemaV5 = typeof dataTypesSchema[keyof typeof dataTypesSchema];