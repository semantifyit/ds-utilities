import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs2 from "./../data/ds-ds2.json";
import dsDs3 from "./../data/ds-ds3.json";
import { DsV7 } from "../../../src";

describe("v7 - tokenizeDsPath()", () => {
  test("context", () => {
    const dsu = new DsUtilitiesV7();
    const tokens1a = dsu.tokenizeDsPath(dsDs2 as DsV7, "@context");
    expect(tokens1a.length).toBe(1);
    expect(tokens1a[0].dsPathNodeType).toBe("Context");
  });
  test("root node", () => {
    const dsu = new DsUtilitiesV7();
    const tokens1b = dsu.tokenizeDsPath(dsDs2 as DsV7, "$");
    expect(tokens1b.length).toBe(1);
    expect(tokens1b[0].dsPathNodeType).toBe("RootNode");
    expect(tokens1b[0].label).toBe("Drawing");
  });
  test("internal reference definition", () => {
    const dsu = new DsUtilitiesV7();
    const tokens1c = dsu.tokenizeDsPath(dsDs2 as DsV7, "#tMMiT");
    expect(tokens1c.length).toBe(1);
    expect(tokens1c[0].dsPathNodeType).toBe("InternalReferenceDefinition");
    expect(tokens1c[0].label).toBe("Person");
  });
  test("external reference definition", () => {
    const dsu = new DsUtilitiesV7();
    const tokens1d = dsu.tokenizeDsPath(dsDs2 as DsV7, "yFV-LM7MP");
    expect(tokens1d.length).toBe(1);
    expect(tokens1d[0].dsPathNodeType).toBe("ExternalReferenceDefinition");
    expect(tokens1d[0].label).toBe("odta:Trail");
  });
  test("internal external reference definition", () => {
    const dsu = new DsUtilitiesV7();
    const tokens1e = dsu.tokenizeDsPath(dsDs2 as DsV7, "kfU7mM0Xy#owwug");
    expect(tokens1e.length).toBe(1);
    expect(tokens1e[0].dsPathNodeType).toBe(
      "InternalExternalReferenceDefinition"
    );
    expect(tokens1e[0].label).toBe("Place");
  });
  test("property first level", () => {
    const dsu = new DsUtilitiesV7();
    const tokens2a = dsu.tokenizeDsPath(dsDs2 as DsV7, "$.schema:creditText");
    expect(tokens2a.length).toBe(2);
    expect(tokens2a[0].dsPathNodeType).toBe("RootNode");
    expect(tokens2a[1].dsPathNodeType).toBe("Property");
    expect(tokens2a[1].label).toBe("creditText");
  });
  test("datatype first level", () => {
    const dsu = new DsUtilitiesV7();
    const tokens2b = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "$.schema:creditText/xsd:string"
    );
    expect(tokens2b.length).toBe(3);
    expect(tokens2b[0].dsPathNodeType).toBe("RootNode");
    expect(tokens2b[1].dsPathNodeType).toBe("Property");
    expect(tokens2b[2].dsPathNodeType).toBe("DataType");
    expect(tokens2b[2].label).toBe("Text");
  });
  test("class first level", () => {
    // internal reference definition -> property -> Class
    const dsu = new DsUtilitiesV7();
    const tokens2c = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "#tMMiT.schema:worksFor/schema:Organization"
    );
    expect(tokens2c.length).toBe(3);
    expect(tokens2c[2].dsPathNodeType).toBe("Class");
    expect(tokens2c[2].label).toBe("Organization");
  });
  test("enumeration first level", () => {
    // external reference definition -> property -> enumeration
    const dsu = new DsUtilitiesV7();
    const tokens2d = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "gsaTefLCP.ex:animalLivingEnvironment/ex:AnimalLivingEnvironment"
    );
    expect(tokens2d.length).toBe(3);
    expect(tokens2d[2].dsPathNodeType).toBe("Enumeration");
    expect(tokens2d[2].label).toBe("ex:AnimalLivingEnvironment");
  });
  test("root reference", () => {
    // root -> property -> class -> property -> rootReference
    const dsu = new DsUtilitiesV7();
    const tokens3a = dsu.tokenizeDsPath(
      dsDs3 as DsV7,
      "$.schema:subjectOf/schema:CreativeWork.schema:about/@$"
    );
    expect(tokens3a.length).toBe(5);
    expect(tokens3a[4].dsPathNodeType).toBe("RootReference");
    expect(tokens3a[4].label).toBe(tokens3a[0].label);
  });
  test("internal reference", () => {
    // root -> property -> internal reference
    const dsu = new DsUtilitiesV7();
    const tokens3b = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "$.schema:creator/@#tMMiT"
    );
    expect(tokens3b.length).toBe(3);
    expect(tokens3b[2].dsPathNodeType).toBe("InternalReference");
    expect(tokens3b[2].label).toBe("Person");
  });
  test("external reference", () => {
    // root -> property  -> external reference
    const dsu = new DsUtilitiesV7();
    const tokens3c = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "$.schema:contentLocation/@yFV-LM7MP"
    );
    expect(tokens3c.length).toBe(3);
    expect(tokens3c[2].dsPathNodeType).toBe("ExternalReference");
    expect(tokens3c[2].label).toBe("odta:Trail");
  });
  test("internal-external reference", () => {
    // root -> property -> external reference
    const dsu = new DsUtilitiesV7();
    const tokens3d = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "$.schema:locationCreated/@kfU7mM0Xy#owwug"
    );
    expect(tokens3d.length).toBe(3);
    expect(tokens3d[2].dsPathNodeType).toBe("InternalExternalReference");
    expect(tokens3d[2].label).toBe("Place");
  });
  test("internal reference-definition", () => {
    // internal reference definition -> property
    const dsu = new DsUtilitiesV7();
    const tokens4a = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "#tMMiT.schema:worksFor"
    );
    expect(tokens4a.length).toBe(2);
    expect(tokens4a[1].dsPathNodeType).toBe("Property");
    expect(tokens4a[1].label).toBe("worksFor");
  });
  test("internal-external reference-definition", () => {
    // internal external reference definition -> property -> class -> property -> datatype
    const dsu = new DsUtilitiesV7();
    const tokens4b = dsu.tokenizeDsPath(
      dsDs2 as DsV7,
      "kfU7mM0Xy#owwug.schema:address/schema:PostalAddress.schema:addressRegion/xsd:string"
    );
    expect(tokens4b.length).toBe(5);
    expect(tokens4b[4].dsPathNodeType).toBe("DataType");
    expect(tokens4b[4].label).toBe("Text");
  });
  test("datatype external vocab", () => {
    const dsu = new DsUtilitiesV7();
    const tokens4c = dsu.tokenizeDsPath(
      dsDs3 as DsV7,
      "$.ex:numberOfLegs/xsd:integer"
    );
    expect(tokens4c.length).toBe(3);
    expect(tokens4c[2].dsPathNodeType).toBe("DataType");
    expect(tokens4c[2].label).toBe("Integer");
  });
});
