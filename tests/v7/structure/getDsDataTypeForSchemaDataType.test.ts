import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";

describe("v7 - getDsDataTypeForSchemaDataType()", () => {
  test("getDsDataTypeForSchemaDataType", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsDataTypeForSchemaDataType("schema:Text")).toBe(
      "xsd:string"
    );
    expect(dsu.getDsDataTypeForSchemaDataType("schema:Integer")).toBe(
      "xsd:integer"
    );
    expect(dsu.getDsDataTypeForSchemaDataType("schema:Float")).toBe(
      "xsd:float"
    );
    expect(dsu.getDsDataTypeForSchemaDataType("schema:URL")).toBe("xsd:anyURI");
    expect(dsu.getDsDataTypeForSchemaDataType("schema:Number")).toBe(
      "xsd:double"
    );
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsDataTypeForSchemaDataType("nothing");
    }).toThrow(
      "Given input 'nothing' is not a valid schema.org datatype in DS-V7."
    );
  });
});
