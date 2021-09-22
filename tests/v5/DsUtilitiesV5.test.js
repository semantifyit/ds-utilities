const DsUtilitiesV5 = require("./../../src/versions/DsUtilitiesV5.js");
const data = require("./../../src/versions/data/dataV5.js");
const testData = {};
testData.dsDs0 = require("../data/v5/ds-ds0.json");
testData.dsDs0NoRoot = require("../data/v5/ds-ds0-no-rootnode.json");
testData.dsDs0NoId = require("../data/v5/ds-ds0-no-id.json");
testData.dsDs0NoGraph = require("../data/v5/ds-ds0-no-graph.json");
testData.dsDs0NoMeta = require("../data/v5/ds-ds0-no-meta.json");
testData.dsDs0ExternalVocab = require("../data/v5/ds-ds0-external-vocab.json");
// testData.dsDs1 = require("../data/v5/ds-ds1.json");

describe("DsUtilitiesV5", () => {
  test("getDsRootNode()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node
    const rootNode = dsu.getDsRootNode(testData.dsDs0);
    expect(rootNode["@id"]).toBe("_:RootNode");
    // no graph array
    expect(() => {
      dsu.getDsRootNode(testData.dsDs0NoGraph);
    }).toThrow(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V5 format."
    );
    // no root node
    expect(() => {
      dsu.getDsRootNode(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsStandardContext()", () => {
    const dsu = new DsUtilitiesV5();
    const context = dsu.getDsStandardContext();
    expect(context["schema"]).toBe("http://schema.org/");
    expect(context["ds:subDSOf"]).toBeUndefined();
    expect(context).toStrictEqual(data.standardContext);
  });
  test("getDsId()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node
    expect(dsu.getDsId(testData.dsDs0)).toBe(
      "http://semantify.it/ds/adsi345n3"
    );
    // root node with no id
    expect(() => {
      dsu.getDsId(testData.dsDs0NoId);
    }).toThrow(
      "The given DS has no @id, which is mandatory for a DS in DS-V5 format."
    );
  });
  test("getDsName()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with schema:name
    expect(dsu.getDsName(testData.dsDs0)).toBe("Airport");
    // correct root node with no schema:name
    expect(dsu.getDsName(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsName(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsDescription()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with schema:description
    expect(dsu.getDsDescription(testData.dsDs0)).toBe(
      "Airport Domain Specification is a pattern for annotating airports using schema.org vocabulary. The goal is to define a set of types and properties needed for semantic annotation."
    );
    // correct root node with no schema:description
    expect(dsu.getDsDescription(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsDescription(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsAuthorName()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with schema:author
    expect(dsu.getDsAuthorName(testData.dsDs0)).toBe("Test person");
    // correct root node with no schema:author
    expect(dsu.getDsAuthorName(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsAuthorName(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsSchemaVersion()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with schema:schemaVersion
    expect(dsu.getDsSchemaVersion(testData.dsDs0)).toBe("3.4");
    // correct root node with no schema:schemaVersion
    expect(() => {
      dsu.getDsSchemaVersion(testData.dsDs0NoMeta);
    }).toThrow(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format."
    );
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsSchemaVersion(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsVersion()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with schema:version
    expect(dsu.getDsVersion(testData.dsDs0)).toBe("1.1");
    // correct root node with no schema:version
    expect(dsu.getDsVersion(testData.dsDs0NoMeta)).toBeUndefined();
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsVersion(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsExternalVocabularies()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with ds:usedVocabulary
    expect(
      dsu.getDsExternalVocabularies(testData.dsDs0ExternalVocab)
    ).toContainEqual("https://semantify.it/voc/IaiA2RES_");
    // correct root node with no ds:usedVocabulary
    expect(dsu.getDsExternalVocabularies(testData.dsDs0).length).toBe(0);
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsExternalVocabularies(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("getDsTargetClasses()", () => {
    const dsu = new DsUtilitiesV5();
    // correct root node with sh:targetClass
    expect(dsu.getDsTargetClasses(testData.dsDs0)).toContainEqual(
      "schema:Airport"
    );
    // correct root node with no sh:targetClass (invalid by 5.0)
    expect(() => {
      dsu.getDsTargetClasses(testData.dsDs0NoMeta);
    }).toThrow(
      "The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format."
    );
    // no root node - same error as for getDsRootNode() since that function is reused
    expect(() => {
      dsu.getDsTargetClasses(testData.dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
});
