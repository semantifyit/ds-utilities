import { DsUtilitiesV7 } from '../../../src/v7/DsUtilitiesV7';

describe("v7 - dsPathAddition()", () => {
  test("Property", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.dsPathAddition("$", "Property", "schema:name")).toBe(
      "$.schema:name"
    );
    expect(
      dsu.dsPathAddition(
        "$.schema:offer/schema:Product,schema:Room",
        "Property",
        "schema:name"
      )
    ).toBe("$.schema:offer/schema:Product,schema:Room.schema:name");
  });
  test("DataType", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.dsPathAddition("$.schema:name", "DataType", "xsd:string")).toBe(
      "$.schema:name/xsd:string"
    );
  });
  test("Class", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathAddition("$.schema:organizer", "Class", ["schema:Person"])
    ).toBe("$.schema:organizer/schema:Person");
    expect(
      dsu.dsPathAddition("$.schema:offer", "Class", [
        "schema:Product",
        "schema:Room"
      ])
    ).toBe("$.schema:offer/schema:Product,schema:Room");
  });
  test("Enumeration", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathAddition("$.schema:dayOfWeek", "Enumeration", [
        "schema:DayOfWeek"
      ])
    ).toBe("$.schema:dayOfWeek/schema:DayOfWeek");
  });
  test("Reference - Root Node", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.dsPathAddition("$.schema:organizer", "RootReference")).toBe(
      "$.schema:organizer/@$"
    );
  });
  test("Reference - Internal reference", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathAddition(
        "$.schema:organizer",
        "InternalReference",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("$.schema:organizer/@#sXZwe");
  });
  test("Reference - External reference", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathAddition(
        "$.schema:organizer",
        "ExternalReference",
        "https://semantify.it/ds/_1hRVOT8Q"
      )
    ).toBe("$.schema:organizer/@_1hRVOT8Q");
  });
  test("Reference - Internal node of an External reference", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathAddition(
        "$.schema:organizer",
        "InternalExternalReference",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("$.schema:organizer/@_1hRVOT8Q#sXZwe");
  });
});
