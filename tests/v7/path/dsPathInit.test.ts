import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";

describe("v7 - dsPathInit()", () => {
  test("root node", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.dsPathInit()).toBe("$");
    expect(dsu.dsPathInit("RootNode")).toBe("$");
    expect(dsu.dsPathInit("RootNode", undefined)).toBe("$");
  });
  test("internal reference definition", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathInit(
        "InternalReferenceDefinition",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("#sXZwe");
  });
  test("external reference definition", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathInit(
        "ExternalReferenceDefinition",
        "https://semantify.it/ds/_1hRVOT8Q"
      )
    ).toBe("_1hRVOT8Q");
  });
  test("internal node from an external reference", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathInit(
        "InternalExternalReferenceDefinition",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("_1hRVOT8Q#sXZwe");
  });
  test("unknown node type", () => {
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.dsPathInit("anything");
    }).toThrow("Unknown node type to initialize a DS Path: anything");
  });
});
