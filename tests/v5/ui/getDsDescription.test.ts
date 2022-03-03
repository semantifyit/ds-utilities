import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";
import { DsV5 } from "../../../src";

describe("v5 - getDsDescription()", () => {
  test("correct root node with schema:description", () => {
    const dsu = new DsUtilitiesV5();
    expect(dsu.getDsDescription(dsDs0 as unknown as DsV5)).toBe(
      "Airport Domain Specification is a pattern for annotating airports using schema.org vocabulary. The goal is to define a set of types and properties needed for semantic annotation."
    );
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsDescription(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("correct root node with no schema:description", () => {
    const dsu = new DsUtilitiesV5();
    // @ts-ignore on purpose
    expect(dsu.getDsDescription(dsDs0NoMeta as DsV5)).toBeUndefined();
  });
});
