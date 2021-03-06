import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsV5 } from "../../../src";
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";

describe("v5 - getDsVersion()", () => {
  test("correct root node with schema:version", () => {
    const dsu = new DsUtilitiesV5();
    expect(dsu.getDsVersion(dsDs0 as unknown as DsV5)).toBe(1.1);
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsVersion(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("correct root node with no schema:version", () => {
    const dsu = new DsUtilitiesV5();
    // @ts-ignore on purpose
    expect(dsu.getDsVersion(dsDs0NoMeta as DsV5)).toBeUndefined();
  });
});
