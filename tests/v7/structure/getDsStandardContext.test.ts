import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import { standardContext } from "../../../src/v7/data/standardContext.data";

describe("v7 - getDsStandardContext()", () => {
  test("getDsStandardContext", () => {
    const dsu = new DsUtilitiesV7();
    const context = dsu.getDsStandardContext();
    expect(context["schema"]).toBe("https://schema.org/");
    expect(context["ds:subDSOf"]).toBeDefined();
    expect(context).toStrictEqual(standardContext);
  });
});
