import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0 from "../data/ds-ds0.json";
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json";
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json";
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - getDsSchemaVersion()", () => {
  test("correct root node with schema:schemaVersion", () => {
    const dsu = new DsUtilitiesV7();
    expect(dsu.getDsSchemaVersion(dsDs0 as DsV7)).toBe("12.0");
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsSchemaVersion(dsDs0NoRoot);
    }).toThrow("The given DS has no identifiable root node in DS-V7 format.");
  });
  test("correct root node with no schema:schemaVersion", () => {
    const dsu = new DsUtilitiesV7();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsSchemaVersion(dsDs0NoMeta);
    }).toThrow(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V7 format."
    );
  });
});
