import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";

describe("v7 - getDataTypeLabel()", () => {
  test("getDataTypeLabel", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDataTypeLabel("xsd:string")).toBe("Text");
    expect(dsu.getDataTypeLabel("rdf:langString")).toBe("Localized Text");
    expect(dsu.getDataTypeLabel("rdf:HTML")).toBe("HTML Text");
    expect(dsu.getDataTypeLabel("xsd:boolean")).toBe("Boolean");
    expect(dsu.getDataTypeLabel("xsd:double")).toBe("Number");
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDataTypeLabel("nothing");
    }).toThrow(
      "Given input 'nothing' is not a valid xsd/rdf datatype in DS-V7."
    );
  });
});
