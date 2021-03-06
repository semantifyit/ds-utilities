import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsV7 } from "../../../src";

describe("v7 - getDsName()", () => {
  test("correct root node with schema:name", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsName(dsDs0 as DsV7)).toBe("poptest_ds0"); // returns the first entry
    expect(dsu.getDsName(dsDs0 as DsV7, "en")).toBe("poptest_ds0");
    expect(dsu.getDsName(dsDs0 as DsV7, "de")).toBe("poptest_ds0 deutsch");
    expect(dsu.getDsName(dsDs0 as DsV7, "it")).toBeUndefined();
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsName(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("correct root node with no schema:name", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsName(dsDs0NoMeta as DsV7)).toBeUndefined();
  });
});
