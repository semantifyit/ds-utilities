import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs2 from "./../data/ds-ds2.json" ;
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - dsPathIdentifyNodeType()", () => {
  test("root node", () => {
    const dsu = new DsUtilitiesV7();
    const rootNode = dsu.getDsRootNode(dsDs2 as DsV7);
    expect(dsu.dsPathIdentifyNodeType(rootNode, dsDs2 as DsV7)).toBe("RootNode");
  });
  test("property", () => {
    const dsu = new DsUtilitiesV7();
    const propertyNode = dsu.dsPathGetNode(dsDs2 as DsV7, "$.schema:creditText");
    expect(dsu.dsPathIdentifyNodeType(propertyNode, dsDs2 as DsV7)).toBe("Property");
  });
  test("DataType", () => {
    const dsu = new DsUtilitiesV7();
    const dtNode = dsu.dsPathGetNode(dsDs2 as DsV7, "$.schema:keywords/xsd:anyURI");
    expect(dsu.dsPathIdentifyNodeType(dtNode, dsDs2 as DsV7)).toBe("DataType");
  });
  test("Class", () => {
    const dsu = new DsUtilitiesV7();
    const classNode = dsu.dsPathGetNode(dsDs2 as DsV7, "#tMMiT.schema:worksFor/schema:Organization");
    expect(dsu.dsPathIdentifyNodeType(classNode, dsDs2 as DsV7)).toBe("Class");
  });
  test("Enumeration", () => {
    const dsu = new DsUtilitiesV7();
    const enumNode = dsu.dsPathGetNode(dsDs2 as DsV7,  "$.schema:about/@gsaTefLCP.ex:animalLivingEnvironment/ex:AnimalLivingEnvironment");
    expect(dsu.dsPathIdentifyNodeType(enumNode, dsDs2 as DsV7)).toBe("Enumeration");
  });
  test("Internal reference", () => {
    const dsu = new DsUtilitiesV7();
    const internalReferenceNode = dsu.dsPathGetNode(dsDs2 as DsV7,  "$.schema:creator/@#tMMiT");
    expect(dsu.dsPathIdentifyNodeType(internalReferenceNode, dsDs2 as DsV7)).toBe("InternalReference");
  });
  test("External reference", () => {
    const dsu = new DsUtilitiesV7();
    const externalReferenceNode = dsu.dsPathGetNode(dsDs2 as DsV7,   "$.schema:contentLocation/@yFV-LM7MP");
    expect(dsu.dsPathIdentifyNodeType(externalReferenceNode, dsDs2 as DsV7)).toBe("ExternalReference");
  });
  test("External internal reference", () => {
    const dsu = new DsUtilitiesV7();
    const internalExternalRefNode = dsu.dsPathGetNode(dsDs2 as DsV7,    "$.schema:locationCreated/@kfU7mM0Xy#owwug");
    expect(dsu.dsPathIdentifyNodeType(internalExternalRefNode, dsDs2 as DsV7)).toBe("InternalExternalReference");
  });
  test("Internal reference definition", () => {
    const dsu = new DsUtilitiesV7();
    const intRefDef = dsu.dsPathGetNode(dsDs2 as DsV7,    "#UhVfN");
    expect(dsu.dsPathIdentifyNodeType(intRefDef, dsDs2 as DsV7)).toBe("InternalReferenceDefinition");
  });
  test("External reference definition", () => {
    const dsu = new DsUtilitiesV7();
    const extRefDef = dsu.dsPathGetNode(dsDs2 as DsV7,    "gsaTefLCP");
    expect(dsu.dsPathIdentifyNodeType(extRefDef, dsDs2 as DsV7)).toBe("ExternalReferenceDefinition");
  });
});
