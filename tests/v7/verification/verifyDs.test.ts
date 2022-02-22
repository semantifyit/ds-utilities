import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/ds-ds0.json" ;
import dsDsNoRoot from "../data/ds-ds0-no-rootnode.json" ;
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - verifyDs()", () => {
  test("Correct DS", () => {
    const dsu = new DsUtilitiesV7();
    const output = dsu.verifyDs(dsDs0 as DsV7);
    expect(output.result).toBe("Valid");
    expect(output.errors.length).toBe(0);
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV7();
    // @ts-ignore on purpose
    const output = dsu.verifyDs(dsDsNoRoot as DsV7);
    expect(output.result).toBe("Invalid");
    expect(output.errors.length).not.toBe(0);
  });
});
