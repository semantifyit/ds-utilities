import dsDs0 from "../data/ds-ds0.json" ;
import dsDs0NoRoot from "../data/ds-ds0-no-rootnode.json" ;
import dsDs0NoMeta from "../data/ds-ds0-no-meta.json" ;
import { DsV5 } from "../../../src/v5/types/DsGrammarV5.type";
import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";

describe("v5 - getDsSchemaVersion()", () => {
  test("correct root node with schema:schemaVersion", () => {
    const dsu = new DsUtilitiesV5();
    expect(dsu.getDsSchemaVersion(dsDs0 as unknown as DsV5)).toBe("3.4");
  });
  test("no root node", () => {
    // same error as for getDsRootNode() since that function is reused
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsSchemaVersion(dsDs0NoRoot);
    }).toThrow(
      "The given DS has no identifiable root node in DS-V5 format."
    );
  });
  test("correct root node with no schema:schemaVersion", () => {
    const dsu = new DsUtilitiesV5();
    expect(() => {
      // @ts-ignore on purpose
      dsu.getDsSchemaVersion(dsDs0NoMeta);
    }).toThrow(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format."
    );
  });
});
