import { dataTypesSchema, dataTypesDs } from "../data/datatypes.data";

export type DataTypeDsV7 = typeof dataTypesDs[keyof typeof dataTypesDs];
export type DataTypeSchemaV7 =
  typeof dataTypesSchema[keyof typeof dataTypesSchema];
