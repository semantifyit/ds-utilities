import dsDs0 from "../data/ds-ds0.json" ;
import dsDs0NoId from "../data/ds-ds0-no-id.json" ;
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";
import { DsV5 } from "../../../src/v5/types/DsGrammarV5.type";

describe("v5 - getDsId()", () => {
  test("correct root node", () => {
    const dsu = new DsUtilitiesV5();
    expect(dsu.getDsId(dsDs0 as unknown as DsV5)).toBe(
      "http://semantify.it/ds/adsi345n3"
    );
  });
  test("ds node with no ide", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsId(dsDs0NoId);
    }).toThrow(
      "The given DS has no @id, which is mandatory for a DS in DS-V5 format."
    );
  });
});
