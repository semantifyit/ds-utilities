import v7dsDs0 from "./../v7/data/ds-ds0.json";
import v7dsDs0NoGraph from "./../v7/data/ds-ds0-no-graph.json";
import v7dsDs0NoRoot from "./../v7/data/ds-ds0-no-rootnode.json";
import v5dsDs0 from "./../v5/data/ds-ds0.json";
import { getDsSpecificationVersion } from "../../src/base/functions/getDsSpecificationVersion.fn";
import { prettyPrintCompactedIRIs } from "../../src/base/functions/prettyPrintCompactedIRIs.fn";
import { extractSdoVersionNumber } from "../../src/base/functions/extractSdoVersionNumber.fn";

describe("DsUtilitiesBase", () => {
  test("getDsSpecificationVersion()", () => {
    // correct root node V5
    expect(getDsSpecificationVersion(v5dsDs0)).toBe("5.0");
    // correct root node V7
    expect(getDsSpecificationVersion(v7dsDs0)).toBe("7.0");
    // no graph array
    expect(() => {
      // @ts-ignore on purpose
      getDsSpecificationVersion(v7dsDs0NoGraph);
    }).toThrow(
      "The given DS has no @graph array, which is expected for any DS version."
    );
    // no root node
    expect(() => {
      // @ts-ignore on purpose
      getDsSpecificationVersion(v7dsDs0NoRoot);
    }).toThrow(
      "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
    );
  });

  test("prettyPrintCompactedIRI()", () => {
    expect(prettyPrintCompactedIRIs("schema:Hotel")).toBe("Hotel");
    expect(prettyPrintCompactedIRIs("schema:name")).toBe("name");
    expect(prettyPrintCompactedIRIs("ex:Hotel")).toBe("ex:Hotel");
    expect(prettyPrintCompactedIRIs(["ex:Hotel"])).toBe("ex:Hotel");
    expect(prettyPrintCompactedIRIs(["ex:Hotel", "schema:Person"])).toBe(
      "ex:Hotel + Person"
    );
  });

  test("extractSdoVersionNumber()", () => {
    expect(
      extractSdoVersionNumber("https://schema.org/docs/releases.html#v10.0")
    ).toBe("10.0");
    expect(
      extractSdoVersionNumber("https://schema.org/docs/releases.html#v12.0/")
    ).toBe("12.0");
    expect(extractSdoVersionNumber("https://schema.org/version/3.4")).toBe(
      "3.4"
    );
    expect(extractSdoVersionNumber("https://schema.org/version/6.0/")).toBe(
      "6.0"
    );
    expect(() => {
      extractSdoVersionNumber("https://schema.org/v/6.0/");
    }).toThrow(
      "The given url did not fit the expected format for a schema.org version url."
    );
  });
});
