const DsUtilitiesV7 = require("./../../src/versions/DsUtilitiesV7.js");
const testData = {};
testData.dsDs0 = require("../data/v7/verification/ds-ds0.json");
testData.dsAnimal = require("../data/v7/verification/ds-animal.json");
testData.dsComplete = require("../data/v7/verification/ds-complete.json");
testData.dsNoGraph = require("../data/v7/verification/ds-no-graph.json");
testData.dsNoContext = require("../data/v7/verification/ds-no-context.json");
testData.dsWrongContext = require("../data/v7/verification/ds-wrong-context.json");
testData.dsWrongContext2 = require("../data/v7/verification/ds-wrong-context-2.json");
testData.dsWrongContext3 = require("../data/v7/verification/ds-wrong-context-3.json");
testData.dsWrongContext4 = require("../data/v7/verification/ds-wrong-context-4.json");
testData.dsNoGraphNodes = require("../data/v7/verification/ds-no-graph-nodes.json");
testData.dsNoRootNode = require("../data/v7/verification/ds-no-root-node.json");
testData.dsRootNodeNoClass = require("../data/v7/verification/ds-rootnode-no-class.json");
testData.dsRootNodeNoId = require("../data/v7/verification/ds-rootnode-no-id.json");
testData.dsRootNodeWrongName = require("../data/v7/verification/ds-rootnode-wrong-name.json");
testData.dsRootNodeWrong = require("../data/v7/verification/ds-rootnode-wrong.json");
testData.dsPropertyNodeWrong = require("../data/v7/verification/ds-propertynode-wrong.json");
testData.dsClassNodeWrong = require("../data/v7/verification/ds-classnode-wrong.json");
testData.dsDataTypeNodeWrong = require("../data/v7/verification/ds-datatypenode-wrong.json");
testData.dsEnumerationNodeWrong = require("../data/v7/verification/ds-enumerationnode-wrong.json");
testData.dsEmptyArrays = require("../data/v7/verification/ds-empty-arrays.json");

// this is the meta verification configuration for semantify (how semantify wants the DS syntax to be, in contrast to the syntax given by the specification)
const semantifyConfig = {
  nodeTermsRootNode: [
    {
      term: "sh:targetClass",
      required: true,
      valueType: "array",
    },
    {
      term: "sh:class",
      required: true,
      valueType: "array",
    },
    {
      term: "schema:name",
      required: true,
      valueType: "array",
    },
    {
      term: "schema:author",
      required: true,
      valueType: "object",
    },
    {
      term: "schema:version",
      required: true,
      valueType: "string",
    },
    {
      term: "sh:closed",
      required: true,
      valueType: "boolean",
    },
  ],
  nodeTermsClassNode: [
    {
      term: "sh:closed",
      required: true,
      valueType: "boolean",
    },
  ],
};

describe("DsUtilitiesV7", () => {
  test("verifyDs() - normal DS", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsDs0);
    expect(report.result).toBe("Valid");
  });

  test("verifyDs() - animal DS", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsAnimal);
    expect(report.result).not.toBe("Invalid");
  });

  test("verifyDs() - complete DS", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsComplete, semantifyConfig);
    expect(report.result).toBe("Valid");
  });

  test("verifyDs() - no @graph", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsNoGraph);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - no @context", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsNoContext);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - wrong @context", () => {
    const dsu = new DsUtilitiesV7();
    const report1 = dsu.verifyDs(testData.dsWrongContext);
    expect(report1.result).toBe("Invalid");
    const report2 = dsu.verifyDs(testData.dsWrongContext2);
    expect(report2.result).toBe("Invalid");
    const report3 = dsu.verifyDs(testData.dsWrongContext3);
    expect(report3.result).toBe("Invalid");
    const report4 = dsu.verifyDs(testData.dsWrongContext4);
    expect(report4.result).toBe("Invalid");
  });

  test("verifyDs() - no @graph nodes", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsNoGraphNodes);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - no root node", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsNoRootNode);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - root node no sh:targetClass", () => {
    const dsu = new DsUtilitiesV7();
    // the standard settings makes this valid, because sh:targetClass is not required
    const report1 = dsu.verifyDs(testData.dsRootNodeNoClass);
    expect(report1.result).toBe("Valid");
    // the given settings (e.g. for semantify.it) require sh:targetClass
    const report2 = dsu.verifyDs(testData.dsRootNodeNoClass, semantifyConfig);
    expect(report2.result).toBe("Invalid");
  });

  test("verifyDs() - root node no @id", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsRootNodeNoId);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - root node wrong name", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsRootNodeWrongName);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - root node wrong", () => {
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsRootNodeWrong);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - property node wrong", () => {
    // has 5 or 6 errors
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsPropertyNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(5);
  });

  test("verifyDs() - class node wrong", () => {
    // has 1 errors by default
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsClassNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(1);
    // has 2 errors with our semantify config
    const report2 = dsu.verifyDs(testData.dsClassNodeWrong, semantifyConfig);
    expect(report2.result).toBe("Invalid");
    expect(report2.errors.length).toBe(2);
  });

  test("verifyDs() - datatype node wrong", () => {
    // has 2 errors
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsDataTypeNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(2);
  });

  test("verifyDs() - enumeration node wrong", () => {
    // has 2 errors and 1 warning
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsEnumerationNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(4);
  });

  test("verifyDs() - empty array", () => {
    // has 10 errors
    const dsu = new DsUtilitiesV7();
    const report = dsu.verifyDs(testData.dsEmptyArrays);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(10);
  });
});
