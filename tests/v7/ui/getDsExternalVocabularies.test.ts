import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs1 from "../data/ds-ds1.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsV7 } from "../../../src";

describe("v7 - getDsExternalVocabularies()", () => {
  test("correct root node with ds:usedVocabulary", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsExternalVocabularies(dsDs1 as DsV7)).toContainEqual(
      "https://semantify.it/voc/IaiA2RES_"
    );
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsExternalVocabularies(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("correct root node with no ds:usedVocabulary", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsExternalVocabularies(dsDs0NoMeta as DsV7).length).toBe(0);
  });
});
