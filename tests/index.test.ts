import {
  getDsUtilitiesForDs,
  getDsUtilitiesForDsSpecVersion,
} from "../src/index";
import dsV5 from "./v5/data/ds-ds0.json";
import dsV7 from "./v7/data/ds-ds0.json";
import dsNoGraphV7 from "./v7/data/ds-ds0-no-graph.json";

describe("index", () => {
  test("getDsUtilitiesForDsSpecVersion()", () => {
    expect(getDsUtilitiesForDsSpecVersion("5.0").getDsUtilitiesVersion()).toBe(
      "5.0"
    );
    expect(getDsUtilitiesForDsSpecVersion("7.0").getDsUtilitiesVersion()).toBe(
      "7.0"
    );
    expect(() => {
      // @ts-ignore on purpose
      getDsUtilitiesForDsSpecVersion("4.0");
    }).toThrow(
      "The given DS Specification Version 4.0 is unknown to DsUtilities."
    );
  });
  test("getDsUtilitiesForDs()", () => {
    expect(getDsUtilitiesForDs(dsV5).getDsUtilitiesVersion()).toBe("5.0");
    expect(getDsUtilitiesForDs(dsV7).getDsUtilitiesVersion()).toBe("7.0");
    expect(() => {
      // @ts-ignore on purpose
      getDsUtilitiesForDs(dsNoGraphV7);
    }).toThrow(
      "The given DS has no @graph array, which is expected for any DS version."
    );
    expect(() => {
      // @ts-ignore on purpose
      getDsUtilitiesForDs({ "@graph": [{ just: "corrupted" }] });
    }).toThrow(
      "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
    );
  });
});
