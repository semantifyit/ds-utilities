import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0Unordered from "../data/ds-ds0-unordered.json" ;
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";
import { cloneJson } from "schema-org-adapter/lib/utilities";

describe("v7 - reorderDsNode()", () => {
  test("illegal input", () => {
    const dsu = new DsUtilitiesV7();
    const copyDsObject = cloneJson(dsDs0Unordered);
    expect(() => {
      // @ts-ignore on purpose
      dsu.reorderDsNode([copyDsObject]);
    }).toThrow("The given input was not an object, as required.");
  });
  test("manual check", () => {
    const dsu = new DsUtilitiesV7();
    const copyDsObject = cloneJson(dsDs0Unordered);
    // ds object
    dsu.reorderDsNode(copyDsObject);
    expect(Object.keys(copyDsObject)[0]).toBe("@context");
    expect(Object.keys(copyDsObject)[1]).toBe("@graph");
    // context
    const copyContext = cloneJson(dsDs0Unordered)["@context"];
    dsu.reorderDsNode(copyContext);
    expect(Object.keys(copyContext)[0]).toBe("ds");
    expect(Object.keys(copyContext)[1]).toBe("rdf");
    expect(copyContext[Object.keys(copyContext)[3]]).toBe(
      "https://schema.org/"
    );
    expect(copyContext[Object.keys(copyContext)[6]]).toStrictEqual({
      "@container": "@list",
      "@type": "@id",
    });
    // root node
    const copyRootNode = cloneJson(dsu.getDsRootNode(dsDs0Unordered as DsV7));
    dsu.reorderDsNode(copyRootNode);
    expect(Object.keys(copyRootNode)[0]).toBe("@id");
    expect(Object.keys(copyRootNode)[1]).toBe("@type");
    // property node
    const copyPropertyNode = cloneJson(
      dsu.getDsRootNode(dsDs0Unordered as DsV7)["sh:property"][0]
    );
    dsu.reorderDsNode(copyPropertyNode);
    expect(Object.keys(copyPropertyNode)[0]).toBe("@type");
    expect(Object.keys(copyPropertyNode)[1]).toBe("sh:order");
    expect(Object.keys(copyPropertyNode)[2]).toBe("sh:path");
  });
});
