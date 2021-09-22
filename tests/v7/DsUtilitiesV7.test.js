const DsUtilitiesV7 = require("./../../src/versions/DsUtilitiesV7.js");
const data = require("./../../src/versions/data/dataV7.js");
const testData = {};
testData.dsDs0 = require("../data/v7/ds-ds0.json");
testData.dsDs0NoRoot = require("../data/v7/ds-ds0-no-rootnode.json");
testData.dsDs0NoGraph = require("../data/v7/ds-ds0-no-graph.json");
testData.dsDs0NoMeta = require("../data/v7/ds-ds0-no-meta.json");
testData.dsDs1 = require("../data/v7/ds-ds1.json");

describe("DsUtilitiesV7", () => {
  test("getDsRootNode()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node
    const rootNode = dsu.getDsRootNode(testData.dsDs0);
    expect(rootNode["@id"]).toBe("https://semantify.it/ds/rsFn_FabM");
    // no graph array
    expect(() => {
      dsu.getDsRootNode(testData.dsDs0NoGraph);
    }).toThrow(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V7 format."
    );
    // no root node
    expect(() => {
      dsu.getDsRootNode(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsStandardContext()", () => {
    const dsu = new DsUtilitiesV7();
    const context = dsu.getDsStandardContext();
    expect(context["schema"]).toBe("https://schema.org/");
    expect(context["ds:subDSOf"]).toBeDefined();
    expect(context).toStrictEqual(data.standardContext);
  });
  test("getDsId()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node
    expect(dsu.getDsId(testData.dsDs0)).toBe(
      "https://semantify.it/ds/rsFn_FabM"
    );
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsId(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
    // root node with no id
    expect(() => {
      dsu.getDsId(testData.dsDs0NoMeta);
    }).toThrow(
      "The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format."
    );
  });
  test("generateInnerNodeId()", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.generateInnerNodeId().length).toBe(5);
    // correct root node with sh:targetClass
    expect(dsu.generateInnerNodeId(testData.dsDs0).length).toBe(5);
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.generateInnerNodeId(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsName()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with schema:name
    expect(dsu.getDsName(testData.dsDs0)).toBe("poptest_ds0"); // returns the first entry
    expect(dsu.getDsName(testData.dsDs0, "en")).toBe("poptest_ds0");
    expect(dsu.getDsName(testData.dsDs0, "de")).toBe("poptest_ds0 deutsch");
    expect(dsu.getDsName(testData.dsDs0, "it")).toBeUndefined();
    // correct root node with no schema:name
    expect(dsu.getDsName(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsName(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsDescription()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with schema:description
    expect(dsu.getDsDescription(testData.dsDs0)).toBe("test"); // returns the first entry
    expect(dsu.getDsDescription(testData.dsDs0, "en")).toBe("test");
    expect(dsu.getDsDescription(testData.dsDs0, "de")).toBe("test de");
    expect(dsu.getDsDescription(testData.dsDs0, "it")).toBeUndefined();
    // correct root node with no schema:description
    expect(dsu.getDsDescription(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsDescription(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsAuthorName()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with schema:author
    expect(dsu.getDsAuthorName(testData.dsDs0)).toBe("omar");
    // correct root node with no schema:author
    expect(dsu.getDsAuthorName(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsAuthorName(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsSchemaVersion()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with schema:schemaVersion
    expect(dsu.getDsSchemaVersion(testData.dsDs0)).toBe("12.0");
    // correct root node with no schema:schemaVersion
    expect(() => {
      dsu.getDsSchemaVersion(testData.dsDs0NoMeta);
    }).toThrow(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V7 format."
    );
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsSchemaVersion(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsVersion()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with schema:version
    expect(dsu.getDsVersion(testData.dsDs0)).toBe("1");
    // correct root node with no schema:version
    expect(dsu.getDsVersion(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsVersion(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsExternalVocabularies()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with ds:usedVocabulary
    expect(dsu.getDsExternalVocabularies(testData.dsDs1)).toContainEqual(
      "https://semantify.it/voc/IaiA2RES_"
    );
    // correct root node with no ds:usedVocabulary
    expect(dsu.getDsExternalVocabularies(testData.dsDs0).length).toBe(0);
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsExternalVocabularies(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("getDsTargetClasses()", () => {
    const dsu = new DsUtilitiesV7();
    // correct root node with sh:targetClass
    expect(dsu.getDsTargetClasses(testData.dsDs0)).toContainEqual(
      "schema:Drawing"
    );
    // correct root node with no sh:targetClass
    expect(dsu.getDsTargetClasses(testData.dsDs0NoMeta).length).toBe(0);
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsTargetClasses(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
});
