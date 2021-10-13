const DsUtilitiesV7 = require("./../../src/versions/DsUtilitiesV7.js");
const data = require("./../../src/versions/data/dataV7.js");
const { cloneJson, isObject } = require("../../src/helperFunctions.js");
const testData = {};
testData.dsDs0 = require("../data/v7/ds-ds0.json");
testData.dsDs0ExternalVocab = require("../data/v7/ds-ds0-external-vocab.json");
testData.dsDs0NoRoot = require("../data/v7/ds-ds0-no-rootnode.json");
testData.dsDs0NoGraph = require("../data/v7/ds-ds0-no-graph.json");
testData.dsDs0NoMeta = require("../data/v7/ds-ds0-no-meta.json");
testData.dsDs0Unordered = require("../data/v7/ds-ds0-unordered.json");
testData.dsDs1 = require("../data/v7/ds-ds1.json");
testData.dsDs2 = require("../data/v7/ds-ds2.json");

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
  test("reorderDs()", () => {
    const dsu = new DsUtilitiesV7();
    const dsCopy = cloneJson(testData.dsDs0Unordered);
    dsu.reorderDs(dsCopy);
    // illegal input
    expect(() => {
      dsu.reorderDs([dsCopy]);
    }).toThrow("The given input was not an object, as required.");
    // ds object
    expect(Object.keys(dsCopy)[0]).toBe("@context");
    expect(Object.keys(dsCopy)[1]).toBe("@graph");
    // context
    expect(Object.keys(dsCopy["@context"])[0]).toBe("ds");
    expect(Object.keys(dsCopy["@context"])[1]).toBe("rdf");
    expect(dsCopy["@context"][Object.keys(dsCopy["@context"])[3]]).toBe(
      "https://schema.org/"
    );
    // root node
    const rootNode = dsu.getDsRootNode(dsCopy);
    expect(Object.keys(rootNode)[0]).toBe("@id");
    expect(Object.keys(rootNode)[1]).toBe("@type");
    // property node
    const propertyNode = rootNode["sh:property"][0];
    expect(Object.keys(propertyNode)[0]).toBe("@type");
    expect(Object.keys(propertyNode)[1]).toBe("sh:order");
    expect(Object.keys(propertyNode)[2]).toBe("sh:path");
    // check whole ds
    const dsToBe = testData.dsDs0ExternalVocab;

    // helper function to recursively check the equal order of terms for two given objects
    function checkObjOrder(obj1, obj2) {
      for (const index in Object.keys(obj1)) {
        const actualTerm = Object.keys(obj1)[index];
        expect(actualTerm).toEqual(Object.keys(obj2)[index]);
        if (Array.isArray(obj1[actualTerm])) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(obj2[actualTerm] instanceof Array).toEqual(true);
          for (let i = 0; i < obj1[actualTerm].length; i++) {
            if (isObject(obj1[actualTerm][i])) {
              checkObjOrder(obj1[actualTerm][i], obj2[actualTerm][i]);
            }
          }
        } else if (isObject(obj1[actualTerm])) {
          checkObjOrder(obj1[actualTerm], obj2[actualTerm]);
        }
      }
    }

    checkObjOrder(dsCopy, dsToBe);
  });
  test("reorderDsNode()", () => {
    const dsu = new DsUtilitiesV7();
    const copyDsObject = cloneJson(testData.dsDs0Unordered);
    // illegal input
    expect(() => {
      dsu.reorderDs([copyDsObject]);
    }).toThrow("The given input was not an object, as required.");
    // ds object
    dsu.reorderDsNode(copyDsObject);
    expect(Object.keys(copyDsObject)[0]).toBe("@context");
    expect(Object.keys(copyDsObject)[1]).toBe("@graph");
    // context
    const copyContext = cloneJson(testData.dsDs0Unordered)["@context"];
    dsu.reorderDsNode(copyContext);
    expect(Object.keys(copyContext)[0]).toBe("ds");
    expect(Object.keys(copyContext)[1]).toBe("rdf");
    expect(copyContext[Object.keys(copyContext)[3]]).toBe(
      "https://schema.org/"
    );
    expect(copyContext[Object.keys(copyContext)[6]]).toStrictEqual({
      "@container": "@list",
      "@type": "@id",
    });
    // root node
    const copyRootNode = cloneJson(dsu.getDsRootNode(testData.dsDs0Unordered));
    dsu.reorderDsNode(copyRootNode);
    expect(Object.keys(copyRootNode)[0]).toBe("@id");
    expect(Object.keys(copyRootNode)[1]).toBe("@type");
    // property node
    const copyPropertyNode = cloneJson(
      dsu.getDsRootNode(testData.dsDs0Unordered)["sh:property"][0]
    );
    dsu.reorderDsNode(copyPropertyNode);
    expect(Object.keys(copyPropertyNode)[0]).toBe("@type");
    expect(Object.keys(copyPropertyNode)[1]).toBe("sh:order");
    expect(Object.keys(copyPropertyNode)[2]).toBe("sh:path");
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

  test("dsPathInit()", () => {
    const dsu = new DsUtilitiesV7();
    // root node
    expect(dsu.dsPathInit()).toBe("$");
    expect(dsu.dsPathInit("RootNode")).toBe("$");
    expect(dsu.dsPathInit("RootNode", undefined)).toBe("$");
    // internal reference definition
    expect(
      dsu.dsPathInit(
        "InternalReferenceDefinition",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("#sXZwe");
    // external reference definition
    expect(
      dsu.dsPathInit(
        "ExternalReferenceDefinition",
        "https://semantify.it/ds/_1hRVOT8Q"
      )
    ).toBe("_1hRVOT8Q");
    // internal node from an external reference
    expect(
      dsu.dsPathInit(
        "InternalExternalReferenceDefinition",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("_1hRVOT8Q#sXZwe");
    // unknown node type
    expect(() => {
      dsu.dsPathInit("anything");
    }).toThrow("Unknown node type to initialize a DS Path: anything");
  });
  test("dsPathAddition()", () => {
    const dsu = new DsUtilitiesV7();
    // Property
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
    // DataType
    expect(dsu.dsPathAddition("$.schema:name", "DataType", "xsd:string")).toBe(
      "$.schema:name/xsd:string"
    );
    // Class
    expect(
      dsu.dsPathAddition("$.schema:organizer", "Class", ["schema:Person"])
    ).toBe("$.schema:organizer/schema:Person");
    expect(
      dsu.dsPathAddition("$.schema:offer", "Class", [
        "schema:Product",
        "schema:Room",
      ])
    ).toBe("$.schema:offer/schema:Product,schema:Room");
    // Enumeration
    expect(
      dsu.dsPathAddition("$.schema:dayOfWeek", "Enumeration", [
        "schema:DayOfWeek",
      ])
    ).toBe("$.schema:dayOfWeek/schema:DayOfWeek");
    //  Reference - Root Node
    expect(dsu.dsPathAddition("$.schema:organizer", "RootReference")).toBe(
      "$.schema:organizer/@$"
    );
    // Reference - Internal reference
    expect(
      dsu.dsPathAddition(
        "$.schema:organizer",
        "InternalReference",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("$.schema:organizer/@#sXZwe");
    // Reference - External reference
    expect(
      dsu.dsPathAddition(
        "$.schema:organizer",
        "ExternalReference",
        "https://semantify.it/ds/_1hRVOT8Q"
      )
    ).toBe("$.schema:organizer/@_1hRVOT8Q");
    // Reference - Internal node of an External reference
    expect(
      dsu.dsPathAddition(
        "$.schema:organizer",
        "InternalExternalReference",
        "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
      )
    ).toBe("$.schema:organizer/@_1hRVOT8Q#sXZwe");
  });
  test("dsPathGetNode()", () => {
    const dsu = new DsUtilitiesV7();
    // root node
    expect(dsu.dsPathGetNode(testData.dsDs2, "$")["@id"]).toBe(
      "https://semantify.it/ds/rsFn_FabM"
    );
    // internal reference definition
    expect(dsu.dsPathGetNode(testData.dsDs2, "#UhVfN")["@id"]).toBe(
      "https://semantify.it/ds/rsFn_FabM#UhVfN"
    );
    // Property
    expect(
      dsu.dsPathGetNode(testData.dsDs2, "$.schema:creditText")["sh:path"]
    ).toBe("schema:creditText");
    expect(
      dsu.dsPathGetNode(testData.dsDs2, "#UhVfN.schema:legalName")["sh:path"]
    ).toBe("schema:legalName");
    // DataType
    expect(
      dsu.dsPathGetNode(testData.dsDs2, "$.schema:keywords/xsd:anyURI")[
        "sh:datatype"
      ]
    ).toBe("xsd:anyURI");
    // Class
    expect(
      dsu.dsPathGetNode(
        testData.dsDs2,
        "#tMMiT.schema:worksFor/schema:Organization"
      )["@id"]
    ).toBe("https://semantify.it/ds/rsFn_FabM#QVtTv");
    // Enumeration (over external reference)
    expect(
      dsu.dsPathGetNode(
        testData.dsDs2,
        "$.schema:about/@gsaTefLCP.ex:animalLivingEnvironment/ex:AnimalLivingEnvironment"
      )["@id"]
    ).toBe("https://semantify.it/ds/gsaTefLCP#lwioY");
    // External reference
    expect(
      Object.keys(
        dsu.dsPathGetNode(testData.dsDs2, "$.schema:about/@gsaTefLCP")
      ).length
    ).toBe(1);
    expect(
      dsu.dsPathGetNode(testData.dsDs2, "$.schema:about/@gsaTefLCP")["@id"]
    ).toBe("https://semantify.it/ds/gsaTefLCP");
    // External reference definition
    expect(
      Object.keys(dsu.dsPathGetNode(testData.dsDs2, "gsaTefLCP")).length
    ).not.toBe(1);
    expect(dsu.dsPathGetNode(testData.dsDs2, "gsaTefLCP")["@id"]).toBe(
      "https://semantify.it/ds/gsaTefLCP"
    );
  });

  test("dsPathIdentifyNodeType()", () => {
    const dsu = new DsUtilitiesV7();
    const ds = testData.dsDs2;
    // root node
    const rootNode = dsu.getDsRootNode(ds);
    expect(dsu.dsPathIdentifyNodeType(rootNode, ds)).toBe("RootNode");
    // property
    const propertyNode = dsu.dsPathGetNode(ds, "$.schema:creditText");
    expect(dsu.dsPathIdentifyNodeType(propertyNode, ds)).toBe("Property");
    // DataType
    const dtNode = dsu.dsPathGetNode(ds, "$.schema:keywords/xsd:anyURI");
    expect(dsu.dsPathIdentifyNodeType(dtNode, ds)).toBe("DataType");
    // Class
    const classNode = dsu.dsPathGetNode(
      ds,
      "#tMMiT.schema:worksFor/schema:Organization"
    );
    expect(dsu.dsPathIdentifyNodeType(classNode, ds)).toBe("Class");
    // Enumeration
    const enumNode = dsu.dsPathGetNode(
      ds,
      "$.schema:about/@gsaTefLCP.ex:animalLivingEnvironment/ex:AnimalLivingEnvironment"
    );
    expect(dsu.dsPathIdentifyNodeType(enumNode, ds)).toBe("Enumeration");
    // Internal reference
    const internalReferenceNode = dsu.dsPathGetNode(
      ds,
      "$.schema:creator/@#tMMiT"
    );
    expect(dsu.dsPathIdentifyNodeType(internalReferenceNode, ds)).toBe(
      "InternalReference"
    );
    // External reference
    const externalReferenceNode = dsu.dsPathGetNode(
      ds,
      "$.schema:contentLocation/@yFV-LM7MP"
    );
    expect(dsu.dsPathIdentifyNodeType(externalReferenceNode, ds)).toBe(
      "ExternalReference"
    );
    // External internal reference
    const internalExternalRefNode = dsu.dsPathGetNode(
      ds,
      "$.schema:locationCreated/@kfU7mM0Xy#owwug"
    );
    expect(dsu.dsPathIdentifyNodeType(internalExternalRefNode, ds)).toBe(
      "InternalExternalReference"
    );

    // internal reference definition
    const intRefDef = dsu.dsPathGetNode(ds, "#UhVfN");
    expect(dsu.dsPathIdentifyNodeType(intRefDef, ds)).toBe(
      "InternalReferenceDefinition"
    );
    // External reference definition
    const extRefDef = dsu.dsPathGetNode(ds, "gsaTefLCP");
    expect(dsu.dsPathIdentifyNodeType(extRefDef, ds)).toBe(
      "ExternalReferenceDefinition"
    );
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
