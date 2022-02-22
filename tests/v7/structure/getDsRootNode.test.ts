import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoGraph from "../data/ds-ds0-no-graph.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - getDsRootNode()", () => {
  test("correct root node", () => {
    const dsu = new DsUtilitiesV7();
    const rootNode = dsu.getDsRootNode(dsDs0 as DsV7);
    expect(rootNode["@id"]).toBe("https://semantify.it/ds/rsFn_FabM");
  });
  test("no graph array", () => {
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsRootNode(dsDs0NoGraph);
    }).toThrow(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V7 format."
    );
  });
  test("no root node", () => {
    const dsu = new DsUtilitiesV7();
    // no root node
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsRootNode(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
});
