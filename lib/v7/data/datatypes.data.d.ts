export declare const dataTypesSchema: {
    readonly text: "schema:Text";
    readonly url: "schema:URL";
    readonly number: "schema:Number";
    readonly integer: "schema:Integer";
    readonly float: "schema:Float";
    readonly boolean: "schema:Boolean";
    readonly time: "schema:Time";
    readonly date: "schema:Date";
    readonly dateTime: "schema:DateTime";
};
export declare const dataTypesDs: {
    readonly string: "xsd:string";
    readonly langString: "rdf:langString";
    readonly url: "xsd:anyURI";
    readonly html: "rdf:HTML";
    readonly double: "xsd:double";
    readonly integer: "xsd:integer";
    readonly float: "xsd:float";
    readonly boolean: "xsd:boolean";
    readonly time: "xsd:time";
    readonly date: "xsd:date";
    readonly dateTime: "xsd:dateTime";
};
export declare const dataTypeMapping: {
    readonly "xsd:string": "schema:Text";
    readonly "rdf:langString": "schema:Text";
    readonly "rdf:HTML": "schema:Text";
    readonly "xsd:boolean": "schema:Boolean";
    readonly "xsd:date": "schema:Date";
    readonly "xsd:dateTime": "schema:DateTime";
    readonly "xsd:time": "schema:Time";
    readonly "xsd:double": "schema:Number";
    readonly "xsd:integer": "schema:Integer";
    readonly "xsd:float": "schema:Float";
    readonly "xsd:anyURI": "schema:URL";
};
export declare const dataTypeMappingToLabel: {
    readonly "xsd:string": "Text";
    readonly "rdf:langString": "Localized Text";
    readonly "rdf:HTML": "HTML Text";
    readonly "xsd:boolean": "Boolean";
    readonly "xsd:date": "Date";
    readonly "xsd:dateTime": "DateTime";
    readonly "xsd:time": "Time";
    readonly "xsd:double": "Number";
    readonly "xsd:integer": "Integer";
    readonly "xsd:float": "Float";
    readonly "xsd:anyURI": "URL";
};
//# sourceMappingURL=datatypes.data.d.ts.map