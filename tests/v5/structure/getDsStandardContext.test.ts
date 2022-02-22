import { DsUtilitiesV5 } from "../../../src/v5/DsUtilitiesV5";
import { standardContext } from "../../../src/v5/data/standardContext.data";

describe("v5 - getDsStandardContext()", () => {
  test("getDsStandardContext", () => {
    const dsu = new DsUtilitiesV5();
    const context = dsu.getDsStandardContext();
    expect(context["schema"]).toBe("http://schema.org/");
    expect(context["ds:subDSOf"]).not.toBeDefined();
    expect(context).toStrictEqual(standardContext);
  });
});
