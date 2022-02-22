"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTypeMappingToLabel = exports.dataTypeMapping = exports.dataTypesDs = exports.dataTypesSchema = void 0;
exports.dataTypesSchema = {
    text: "schema:Text",
    url: "schema:URL",
    number: "schema:Number",
    integer: "schema:Integer",
    float: "schema:Float",
    boolean: "schema:Boolean",
    time: "schema:Time",
    date: "schema:Date",
    dateTime: "schema:DateTime"
};
exports.dataTypesDs = {
    string: "xsd:string",
    url: "xsd:anyURI",
    double: "xsd:double",
    integer: "xsd:integer",
    float: "xsd:float",
    boolean: "xsd:boolean",
    time: "xsd:time",
    date: "xsd:date",
    dateTime: "xsd:dateTime"
};
exports.dataTypeMapping = {
    [exports.dataTypesDs.string]: exports.dataTypesSchema.text,
    [exports.dataTypesDs.boolean]: exports.dataTypesSchema.boolean,
    [exports.dataTypesDs.date]: exports.dataTypesSchema.date,
    [exports.dataTypesDs.dateTime]: exports.dataTypesSchema.dateTime,
    [exports.dataTypesDs.time]: exports.dataTypesSchema.time,
    [exports.dataTypesDs.double]: exports.dataTypesSchema.number,
    [exports.dataTypesDs.integer]: exports.dataTypesSchema.integer,
    [exports.dataTypesDs.float]: exports.dataTypesSchema.float,
    [exports.dataTypesDs.url]: exports.dataTypesSchema.url
};
exports.dataTypeMappingToLabel = {
    [exports.dataTypesDs.string]: "Text",
    [exports.dataTypesDs.boolean]: "Boolean",
    [exports.dataTypesDs.date]: "Date",
    [exports.dataTypesDs.dateTime]: "DateTime",
    [exports.dataTypesDs.time]: "Time",
    [exports.dataTypesDs.double]: "Number",
    [exports.dataTypesDs.integer]: "Integer",
    [exports.dataTypesDs.float]: "Float",
    [exports.dataTypesDs.url]: "URL"
};
//# sourceMappingURL=datatypes.data.js.map