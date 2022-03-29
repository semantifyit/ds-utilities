import { dataTypesSchema, dataTypesDs } from "../data/datatypes.data";

/**
 *  These are the Data Types used in DS-Specification 7.0.
 *
 *  They are listed in the [DS-V7 Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/datatype#3.1.-datatype-mapping) in the `XSD` column.
 */
export type DataTypeDsV7 = typeof dataTypesDs[keyof typeof dataTypesDs];

/**
 *  These are the original Data Types from Schema.org, that are mapped in DS-Specification 7.0.
 *
 *  They are listed in the [DS-V7 Specification](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/datatype#3.1.-datatype-mapping) in the `Schema.org` column.
 */
export type DataTypeSchemaV7 =
  typeof dataTypesSchema[keyof typeof dataTypesSchema];
