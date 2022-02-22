import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";

describe("v7 - getSchemaDataTypeForDsDataType()", () => {
  test("getSchemaDataTypeForDsDataType", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getSchemaDataTypeForDsDataType("xsd:string")).toBe(
      "schema:Text"
    );
    expect(dsu.getSchemaDataTypeForDsDataType("rdf:langString")).toBe(
      "schema:Text"
    );
    expect(dsu.getSchemaDataTypeForDsDataType("rdf:HTML")).toBe("schema:Text");
    expect(dsu.getSchemaDataTypeForDsDataType("xsd:integer")).toBe(
      "schema:Integer"
    );
    expect(dsu.getSchemaDataTypeForDsDataType("xsd:float")).toBe(
      "schema:Float"
    );
    expect(dsu.getSchemaDataTypeForDsDataType("xsd:anyURI")).toBe("schema:URL");
    expect(dsu.getSchemaDataTypeForDsDataType("xsd:double")).toBe(
      "schema:Number"
    );
    expect(() => {
      // @ts-ignore on purpose
      dsu.getSchemaDataTypeForDsDataType("nothing");
    }).toThrow(
      "Given input 'nothing' is not a valid xsd/rdf datatype in DS-V7."
    );
  });
});
