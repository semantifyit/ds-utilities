import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import dsDs0Unordered from "../data/ds-ds0-unordered.json";
import dsDs0ExternalVocab from "../data/ds-ds0-external-vocab.json";
import { cloneJson, isObject } from "schema-org-adapter/lib/utilities";
import { DsV7 } from "../../../src/v7/types/DsGrammarV7.type";

describe("v7 - reorderDs()", () => {
  test("illegal input", () => {
    const dsu = new DsUtilitiesV7();
    const dsCopy = cloneJson(dsDs0Unordered);
    expect(() => {
      // @ts-ignore on purpose
      dsu.reorderDs([dsCopy]);
    }).toThrow("The given input was not an object, as required.");
  });
  test("manual check", () => {
    const dsu = new DsUtilitiesV7();
    const dsCopy = cloneJson(dsDs0Unordered);
    dsu.reorderDs(dsCopy as DsV7);
    // ds object
    expect(Object.keys(dsCopy)[0]).toBe("@context");
    expect(Object.keys(dsCopy)[1]).toBe("@graph");
    // context
    expect(Object.keys(dsCopy["@context"])[0]).toBe("ds");
    expect(Object.keys(dsCopy["@context"])[1]).toBe("rdf");
    expect(dsCopy["@context"][Object.keys(dsCopy["@context"])[3]]).toBe(
      "https://schema.org/"
    );
    // root node
    const rootNode = dsu.getDsRootNode(dsCopy as DsV7);
    expect(Object.keys(rootNode)[0]).toBe("@id");
    expect(Object.keys(rootNode)[1]).toBe("@type");
    // property node
    const propertyNode = rootNode["sh:property"][0];
    expect(Object.keys(propertyNode)[0]).toBe("@type");
    expect(Object.keys(propertyNode)[1]).toBe("sh:order");
    expect(Object.keys(propertyNode)[2]).toBe("sh:path");
  });
  test("complete check", () => {
    const dsu = new DsUtilitiesV7();
    const dsCopy = cloneJson(dsDs0Unordered);
    dsu.reorderDs(dsCopy as DsV7);
    const dsToBe = dsDs0ExternalVocab;

    // helper function to recursively check the equal order of terms for two given objects
    function checkObjOrder(obj1, obj2) {
      for (const index in Object.keys(obj1)) {
        const actualTerm = Object.keys(obj1)[index];
        expect(actualTerm).toEqual(Object.keys(obj2)[index]);
        if (Array.isArray(obj1[actualTerm])) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(obj2[actualTerm] instanceof Array).toEqual(true);
          for (let i = 0; i < obj1[actualTerm].length; i++) {
            if (isObject(obj1[actualTerm][i])) {
              checkObjOrder(obj1[actualTerm][i], obj2[actualTerm][i]);
            }
          }
        } else if (isObject(obj1[actualTerm])) {
          checkObjOrder(obj1[actualTerm], obj2[actualTerm]);
        }
      }
    }

    checkObjOrder(dsCopy, dsToBe);
  });
});
