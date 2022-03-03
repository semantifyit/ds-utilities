import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsV5 } from "../../../src";
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";

describe("v5 - getDsTargetClasses()", () => {
  test("correct root node with sh:targetClass", () => {
    const dsu = new DsUtilitiesV5();
    expect(dsu.getDsTargetClasses(dsDs0 as unknown as DsV5)).toContainEqual(
      "schema:Airport"
    );
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsTargetClasses(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V5 format.");
  });
  test("correct root node with no sh:targetClass", () => {
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsTargetClasses(dsDs0NoMeta);
    }).toThrow(
      "The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format."
    );
  });
});
