import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";
import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoGraph from "../data/ds-ds0-no-graph.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import { DsV5 } from "../../../src";

describe("v5 - getDsRootNode()", () => {
  test("correct root node", () => {
    const dsu = new DsUtilitiesV5();
    const rootNode = dsu.getDsRootNode(dsDs0 as unknown as DsV5);
    expect(rootNode["@id"]).toBe("_:RootNode");
  });
  test("no graph array", () => {
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsRootNode(dsDs0NoGraph);
    }).toThrow(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V5 format."
    );
  });
  test("no root node", () => {
    const dsu = new DsUtilitiesV5();
    // no root node
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsRootNode(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
});
