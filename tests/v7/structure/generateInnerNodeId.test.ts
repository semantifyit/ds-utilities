import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - getDsId()", () => {
  test("correct root node", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.generateInnerNodeId().length).toBe(5);
    expect(dsu.generateInnerNodeId(dsDs0 as DsV7).length).toBe(5);
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV7();
    expect(() => {
      dsu.generateInnerNodeId(dsDs0NoRoot as DsV7);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
});
