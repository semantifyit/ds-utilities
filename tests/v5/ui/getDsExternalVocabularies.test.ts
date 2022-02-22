import dsDs0ExternalVocab from "../data/ds-ds0-external-vocab.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import { DsV5 } from "../../../src/v5/types/DsGrammarV5.type";
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";

describe("v5 - getDsExternalVocabularies()", () => {
  test("correct root node with ds:usedVocabulary", () => {
    const dsu = new DsUtilitiesV5();
    expect(
      dsu.getDsExternalVocabularies(dsDs0ExternalVocab as unknown as DsV5)
    ).toContainEqual("https://semantify.it/voc/IaiA2RES_");
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsExternalVocabularies(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
});
