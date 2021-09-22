const index = require("../src/index.js");
const testData = {};
testData.dsV5 = require("./data/v5/ds-ds0.json");
testData.dsV7 = require("./data/v7/ds-ds0.json");
testData.dsNoGraphV7 = require("./data/v7/ds-ds0-no-graph.json");

describe("index", () => {
  test("getDsUtilitiesForDsSpecVersion()", () => {
    expect(index.getDsUtilitiesForDsSpecVersion("5.0").dsUtilitiesVersion).toBe(
      "5.0"
    );
    expect(index.getDsUtilitiesForDsSpecVersion("7.0").dsUtilitiesVersion).toBe(
      "7.0"
    );
    expect(() => {
      index.getDsUtilitiesForDsSpecVersion("4.0");
    }).toThrow(
      "The given DS Specification Version 4.0 is unknown to DsUtilities."
    );
  });
  test("getDsUtilitiesForDs()", () => {
    expect(index.getDsUtilitiesForDs(testData.dsV5).dsUtilitiesVersion).toBe(
      "5.0"
    );
    expect(index.getDsUtilitiesForDs(testData.dsV7).dsUtilitiesVersion).toBe(
      "7.0"
    );
    expect(() => {
      index.getDsUtilitiesForDs(testData.dsNoGraphV7);
    }).toThrow(
      "The given DS has no @graph array, which is expected for any DS version."
    );
    expect(() => {
      index.getDsUtilitiesForDs({ "@graph": [{ just: "corrupted" }] });
    }).toThrow(
      "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
    );
  });
});
