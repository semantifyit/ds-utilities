import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs2 from "../data/ds-ds2.json";
import dsDs3 from "../data/ds-ds3.json";
import { DsV7 } from "../../../src";

describe("v7 - identifyDsGrammarNodeType()", () => {
  test("root node", () => {
    const dsu = new DsUtilitiesV7();
    const rootNode = dsu.getDsRootNode(dsDs2 as DsV7);
    expect(dsu.identifyDsGrammarNodeType(rootNode, dsDs2 as DsV7, true)).toBe(
      "RootNode"
    );
  });
  test("context", () => {
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.identifyDsGrammarNodeType(dsDs2["@context"], dsDs2 as DsV7, true)
    ).toBe("Context");
  });
  test("property", () => {
    const dsu = new DsUtilitiesV7();
    const propertyNode = dsu.dsPathGetNode(
      dsDs2 as DsV7,
      "$.schema:creditText"
    );
    expect(
      dsu.identifyDsGrammarNodeType(propertyNode, dsDs2 as DsV7, true)
    ).toBe("Property");
  });
  test("dataType", () => {
    const dsu = new DsUtilitiesV7();
    const dtNode = dsu.dsPathGetNode(
      dsDs2 as DsV7,
      "$.schema:keywords/xsd:anyURI"
    );
    expect(dsu.identifyDsGrammarNodeType(dtNode, dsDs2 as DsV7, true)).toBe(
      "DataType"
    );
  });
  test("Restricted Class", () => {
    const dsu = new DsUtilitiesV7();
    const rcNode = dsu.dsPathGetNode(
      dsDs2 as DsV7,
      "#tMMiT.schema:worksFor/schema:Organization"
    );
    expect(dsu.identifyDsGrammarNodeType(rcNode, dsDs2 as DsV7, true)).toBe(
      "RestrictedClass"
    );
  });
  test("Restricted Enumeration", () => {
    const dsu = new DsUtilitiesV7();
    const reNode = dsu.dsPathGetNode(
      dsDs2 as DsV7,
      "$.schema:about/@gsaTefLCP.ex:animalLivingEnvironment/ex:AnimalLivingEnvironment"
    );
    expect(dsu.identifyDsGrammarNodeType(reNode, dsDs2 as DsV7, true)).toBe(
      "RestrictedEnumeration"
    );
  });
  test("Reference node - Restricted Class", () => {
    const dsu = new DsUtilitiesV7();
    const internalExternalRefNode = dsu.dsPathGetNode(
      dsDs2 as DsV7,
      "$.schema:locationCreated/@kfU7mM0Xy#owwug",
      false
    );
    expect(
      dsu.identifyDsGrammarNodeType(
        internalExternalRefNode,
        dsDs2 as DsV7,
        true
      )
    ).toBe("RestrictedClass");
    expect(
      dsu.identifyDsGrammarNodeType(
        internalExternalRefNode,
        dsDs2 as DsV7,
        false
      )
    ).toBe("InternalExternalReference");
  });
  test("Reference node - Root Node", () => {
    const dsu = new DsUtilitiesV7();
    const rootRefNode = dsu.dsPathGetNode(
      dsDs3 as DsV7,
      "$.schema:subjectOf/schema:CreativeWork.schema:about/@$",
      false
    );
    expect(
      dsu.identifyDsGrammarNodeType(rootRefNode, dsDs3 as DsV7, true)
    ).toBe("RootNode");
    expect(
      dsu.identifyDsGrammarNodeType(rootRefNode, dsDs3 as DsV7, false)
    ).toBe("RootReference");
  });
  test("enumeration member", () => {
    const dsu = new DsUtilitiesV7();
    const enumMemberNode = {
      "@id": "ex:AnimalLivingEnvironmentDomestic",
    };
    expect(
      dsu.identifyDsGrammarNodeType(enumMemberNode, dsDs2 as DsV7, true)
    ).toBe("EnumerationMember");
    expect(
      dsu.identifyDsGrammarNodeType(enumMemberNode, dsDs2 as DsV7, false)
    ).toBe("EnumerationMember");
  });
  // todo test standard class and standard enumeration, with and without SDO Adapter
});
