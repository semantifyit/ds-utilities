import { DsUtilitiesV7 } from "../../../src/v7/DsUtilitiesV7";
import { create } from "schema-org-adapter";

describe("v7 - checkClassMatch()", () => {
  test("Class Match Scenarios", async() => {
    const mySdoAdapter = await create({
      schemaVersion: "13.0",
    });
    const dsu = new DsUtilitiesV7();
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness"],
        ["schema:Hotel"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness"],
        ["schema:LodgingBusiness"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:Hotel"],
        ["schema:LodgingBusiness"],
        mySdoAdapter
      )
    ).toBe(false);
    expect(
      dsu.checkClassMatch(
        ["schema:Organization", "schema:Place"],
        ["schema:CreativeWork"],
        mySdoAdapter
      )
    ).toBe(false);
    // examples from https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/verificationreport/ds-verification#semantics-for-class-matching
    expect(
      dsu.checkClassMatch(
        ["schema:Organization", "schema:Place"],
        ["schema:Restaurant"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness"],
        ["schema:LodgingBusiness", "schema:Product"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness"],
        ["schema:Motel"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness"],
        ["schema:CreativeWork"],
        mySdoAdapter
      )
    ).toBe(false);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness", "schema:Product"],
        ["schema:LodgingBusiness", "schema:Product"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness", "schema:Product"],
        ["schema:LodgingBusiness", "schema:Product", "schema:CreativeWork"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness", "schema:Product"],
        ["schema:Hotel", "schema:Product"],
        mySdoAdapter
      )
    ).toBe(true);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness", "schema:Product"],
        ["schema:LodgingBusiness"],
        mySdoAdapter
      )
    ).toBe(false);
    expect(
      dsu.checkClassMatch(
        ["schema:LodgingBusiness", "schema:Product"],
        ["schema:CreativeWork"],
        mySdoAdapter
      )
    ).toBe(false);
  });
});
