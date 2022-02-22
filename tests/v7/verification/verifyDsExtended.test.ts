import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/verification/ds-ds0.json";
import dsAnimal from "../data/verification/ds-animal.json";
import dsComplete from "../data/verification/ds-complete.json";
import dsNoGraph from "../data/verification/ds-no-graph.json";
import dsNoContext from "../data/verification/ds-no-context.json";
import dsWrongContext from "../data/verification/ds-wrong-context.json";
import dsWrongContext2 from "../data/verification/ds-wrong-context-2.json";
import dsWrongContext3 from "../data/verification/ds-wrong-context-3.json";
import dsWrongContext4 from "../data/verification/ds-wrong-context-4.json";
import dsNoGraphNodes from "../data/verification/ds-no-graph-nodes.json";
import dsNoRootNode from "../data/verification/ds-no-root-node.json";
import dsRootNodeNoClass from "../data/verification/ds-rootnode-no-class.json";
import dsRootNodeNoId from "../data/verification/ds-rootnode-no-id.json";
import dsRootNodeWrongName from "../data/verification/ds-rootnode-wrong-name.json";
import dsRootNodeWrong from "../data/verification/ds-rootnode-wrong.json";
import dsPropertyNodeWrong from "../data/verification/ds-propertynode-wrong.json";
import dsClassNodeWrong from "../data/verification/ds-classnode-wrong.json";
import dsDataTypeNodeWrong from "../data/verification/ds-datatypenode-wrong.json";
import dsEnumerationNodeWrong from "../data/verification/ds-enumerationnode-wrong.json";
import dsEmptyArrays from "../data/verification/ds-empty-arrays.json";
import dsLabels from "../data/verification/ds-labels.json";
import { semantifyConfig } from "../../../src/v7/data/nodeSchemas/Semantify.nodeSchema";

describe("v7 - verifyDs() Extended", () => {
  test("verifyDs() - normal DS", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsDs0);
    expect(report.result).toBe("Valid");
  });

  test("verifyDs() - animal DS", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsAnimal);
    expect(report.result).not.toBe("Invalid");
  });

  test("verifyDs() - complete DS", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsComplete, semantifyConfig);
    expect(report.result).toBe("Valid");
  });

  test("verifyDs() - no @graph", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsNoGraph);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - no @context", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsNoContext);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - wrong @context", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report1 = dsu.verifyDs(dsWrongContext);
    expect(report1.result).toBe("Invalid");
    // @ts-ignore on purpose
    const report2 = dsu.verifyDs(dsWrongContext2);
    expect(report2.result).toBe("Invalid");
    // @ts-ignore on purpose
    const report3 = dsu.verifyDs(dsWrongContext3);
    expect(report3.result).toBe("Invalid");
    // @ts-ignore on purpose
    const report4 = dsu.verifyDs(dsWrongContext4);
    expect(report4.result).toBe("Invalid");
  });

  test("verifyDs() - no @graph nodes", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsNoGraphNodes);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - no root node", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsNoRootNode);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - root node no sh:targetClass", () => {
    const dsu = new DsUtilitiesV7();
    // the standard settings makes this valid, because sh:targetClass is not required
    // @ts-ignore on purpose
    const report1 = dsu.verifyDs(dsRootNodeNoClass);
    expect(report1.result).toBe("Valid");
    // the given settings (e.g. for semantify.it) require sh:targetClass
    // @ts-ignore on purpose
    const report2 = dsu.verifyDs(dsRootNodeNoClass, semantifyConfig);
    expect(report2.result).toBe("Invalid");
  });

  test("verifyDs() - root node no @id", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsRootNodeNoId);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - root node wrong name", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsRootNodeWrongName);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - root node wrong", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsRootNodeWrong);
    expect(report.result).toBe("Invalid");
  });

  test("verifyDs() - property node wrong", () => {
    // has 5 or 6 errors
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsPropertyNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(5);
  });

  test("verifyDs() - class node wrong", () => {
    // has 1 errors by default
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsClassNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(1);
    // has 2 errors with our semantify config
    // @ts-ignore on purpose
    const report2 = dsu.verifyDs(dsClassNodeWrong, semantifyConfig);
    expect(report2.result).toBe("Invalid");
    expect(report2.errors.length).toBe(2);
  });

  test("verifyDs() - datatype node wrong", () => {
    // has 2 errors
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsDataTypeNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(2);
  });

  test("verifyDs() - enumeration node wrong", () => {
    // has 2 errors and 1 warning
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsEnumerationNodeWrong);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(4);
  });

  test("verifyDs() - rdfs label and comment", () => {
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsLabels);
    expect(report.result).toBe("Valid");
    expect(report.errors.length).toBe(0);
  });

  test("verifyDs() - empty array", () => {
    // has 10 errors
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const report = dsu.verifyDs(dsEmptyArrays);
    expect(report.result).toBe("Invalid");
    expect(report.errors.length).toBe(10);
  });
});
