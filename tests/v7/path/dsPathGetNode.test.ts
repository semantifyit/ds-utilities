import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs2 from "./../data/ds-ds2.json";
import { DsV7 } from "../../../src";

describe("v7 - dsPathGetNode()", () => {
  test("root node", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.dsPathGetNode(dsDs2 as DsV7, "$")["@id"]).toBe(
      "https://semantify.it/ds/rsFn_FabM"
    );
  });
  test("internal reference definition", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.dsPathGetNode(dsDs2 as DsV7, "#UhVfN")["@id"]).toBe(
      "https://semantify.it/ds/rsFn_FabM#UhVfN"
    );
  });
  test("Property", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathGetNode(dsDs2 as DsV7, "$.schema:creditText")["sh:path"]
    ).toBe("schema:creditText");
    expect(
      dsu.dsPathGetNode(dsDs2 as DsV7, "#UhVfN.schema:legalName")["sh:path"]
    ).toBe("schema:legalName");
  });
  test("DataType", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathGetNode(dsDs2 as DsV7, "$.schema:keywords/xsd:anyURI")[
        "sh:datatype"
      ]
    ).toBe("xsd:anyURI");
  });
  test("Class", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathGetNode(
        dsDs2 as DsV7,
        "#tMMiT.schema:worksFor/schema:Organization"
      )["@id"]
    ).toBe("https://semantify.it/ds/rsFn_FabM#QVtTv");
  });
  test("Enumeration (over external reference)", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.dsPathGetNode(
        dsDs2 as DsV7,
        "$.schema:about/@gsaTefLCP.ex:animalLivingEnvironment/ex:AnimalLivingEnvironment"
      )["@id"]
    ).toBe("https://semantify.it/ds/gsaTefLCP#lwioY");
  });
  test("External reference", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      Object.keys(dsu.dsPathGetNode(dsDs2 as DsV7, "$.schema:about/@gsaTefLCP"))
        .length
    ).toBe(1);
    expect(
      dsu.dsPathGetNode(dsDs2 as DsV7, "$.schema:about/@gsaTefLCP")["@id"]
    ).toBe("https://semantify.it/ds/gsaTefLCP");
  });
  test("External reference definition", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      Object.keys(dsu.dsPathGetNode(dsDs2 as DsV7, "gsaTefLCP")).length
    ).not.toBe(1);
    expect(dsu.dsPathGetNode(dsDs2 as DsV7, "gsaTefLCP")["@id"]).toBe(
      "https://semantify.it/ds/gsaTefLCP"
    );
  });
});
