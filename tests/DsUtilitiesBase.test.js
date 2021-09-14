const DsUtilitiesBase = require("../src/versions/DsUtilitiesBase.js");
const testData = {};
testData.v7dsDs0 = require("./data/v7/ds-ds0.json");
testData.v5dsDs0 = require("./data/v5/ds-ds0.json");
testData.v7dsDs0NoGraph = require("./data/v7/ds-ds0-no-graph.json");
testData.v7dsDs0NoRoot = require("./data/v7/ds-ds0-no-rootnode.json");

describe("DsUtilitiesBase", () => {
  test("dsUtilitiesVersion", () => {
    const dsu = new DsUtilitiesBase();
    expect(dsu.dsUtilitiesVersion).toBeUndefined();
  });
  test("getDsSpecificationVersion()", () => {
    const dsu = new DsUtilitiesBase();
    // correct root node V5
    expect(dsu.getDsSpecificationVersion(testData.v5dsDs0)).toBe("5.0");
    // correct root node V7
    expect(dsu.getDsSpecificationVersion(testData.v7dsDs0)).toBe("7.0");
    // no graph array
    expect(() => {
      dsu.getDsSpecificationVersion(testData.v7dsDs0NoGraph);
    }).toThrow(
      "The given DS has no @graph array, which is expected for any DS version."
    );
    // no root node
    expect(() => {
      dsu.getDsSpecificationVersion(testData.v7dsDs0NoRoot);
    }).toThrow(
      "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
    );
  });

  test("prettyPrintCompactedIRI()", () => {
    const dsu = new DsUtilitiesBase();
    expect(dsu.prettyPrintCompactedIRI("schema:Hotel")).toBe("Hotel");
    expect(dsu.prettyPrintCompactedIRI("schema:name")).toBe("name");
    expect(dsu.prettyPrintCompactedIRI("ex:Hotel")).toBe("ex:Hotel");
    expect(dsu.prettyPrintCompactedIRI(["ex:Hotel"])).toBe("ex:Hotel");
    expect(dsu.prettyPrintCompactedIRI(["ex:Hotel", "schema:Person"])).toBe(
      "ex:Hotel + Person"
    );
  });

  test("extractSdoVersionNumber()", () => {
    const dsu = new DsUtilitiesBase();
    expect(
      dsu.extractSdoVersionNumber("https://schema.org/docs/releases.html#v10.0")
    ).toBe("10.0");
    expect(
      dsu.extractSdoVersionNumber(
        "https://schema.org/docs/releases.html#v12.0/"
      )
    ).toBe("12.0");
    expect(dsu.extractSdoVersionNumber("https://schema.org/version/3.4")).toBe(
      "3.4"
    );
    expect(dsu.extractSdoVersionNumber("https://schema.org/version/6.0/")).toBe(
      "6.0"
    );
    expect(() => {
      dsu.extractSdoVersionNumber("https://schema.org/v/6.0/");
    }).toThrow(
      "The given url did not fit the expected format for a schema.org version url."
    );
  });
});
