import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - getDsId()", () => {
  test("correct root node", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsId(dsDs0 as DsV7)).toBe(
      "https://semantify.it/ds/rsFn_FabM"
    );
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsId(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("no meta", () => {
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsId(dsDs0NoMeta);
    }).toThrow(
      "The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format."
    );
  });
});
