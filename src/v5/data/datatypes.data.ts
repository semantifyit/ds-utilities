export const dataTypesSchema = {
  text: "schema:Text",
  url: "schema:URL",
  number: "schema:Number",
  integer: "schema:Integer",
  float: "schema:Float",
  boolean: "schema:Boolean",
  time: "schema:Time",
  date: "schema:Date",
  dateTime: "schema:DateTime"
} as const;

export const dataTypesDs = {
  string: "xsd:string",
  url: "xsd:anyURI",
  double: "xsd:double",
  integer: "xsd:integer",
  float: "xsd:float",
  boolean: "xsd:boolean",
  time: "xsd:time",
  date: "xsd:date",
  dateTime: "xsd:dateTime"
} as const;

// https://gitbook.semantify.it/domainspecifications/ds-v5/grammar/domainspecification/datatype#datatype-mapping
export const dataTypeMapping = {
  [dataTypesDs.string]: dataTypesSchema.text,
  [dataTypesDs.boolean]: dataTypesSchema.boolean,
  [dataTypesDs.date]: dataTypesSchema.date,
  [dataTypesDs.dateTime]: dataTypesSchema.dateTime,
  [dataTypesDs.time]: dataTypesSchema.time,
  [dataTypesDs.double]: dataTypesSchema.number,
  [dataTypesDs.integer]: dataTypesSchema.integer,
  [dataTypesDs.float]: dataTypesSchema.float,
  [dataTypesDs.url]: dataTypesSchema.url
} as const;

export const dataTypeMappingToLabel = {
  [dataTypesDs.string]: "Text",
  [dataTypesDs.boolean]: "Boolean",
  [dataTypesDs.date]: "Date",
  [dataTypesDs.dateTime]: "DateTime",
  [dataTypesDs.time]: "Time",
  [dataTypesDs.double]: "Number",
  [dataTypesDs.integer]: "Integer",
  [dataTypesDs.float]: "Float",
  [dataTypesDs.url]: "URL"
} as const;