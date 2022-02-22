import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";
import { DsV5 } from "../../../src/v5/types/DsGrammarV5.type";

describe("v5 - getDsAuthorName()", () => {
  test("correct root node with schema:author", () => {
    const dsu = new DsUtilitiesV5();
    expect(dsu.getDsAuthorName(dsDs0 as unknown as DsV5)).toBe("Test person");
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsAuthorName(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("correct root node with no schema:author", () => {
    const dsu = new DsUtilitiesV5();
    // @ts-ignore on purpose - casting to DsV5 should work actually - works when copying the file locally, but not if loaded. Strange
    expect(dsu.getDsAuthorName(dsDs0NoMeta as DsV5)).toBeUndefined();
  });
});
