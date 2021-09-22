/*
 * This file contains the functions used by DsUtilitiesBase
 */

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

/**
 * Returns the used DS specification version used in the given DS.
 *
 * @param ds {object} - The input DS
 * @return {string} - The detected DS specification version used
 */
const getDsSpecificationVersion = (ds) => {
  if (!Array.isArray(ds["@graph"])) {
    throw new Error(
      "The given DS has no @graph array, which is expected for any DS version."
    );
  }
  // check if the version is "7.0" or later
  try {
    // expected root node format for DS-V7 and later
    const rootNode = ds["@graph"].find(
      (el) => el["@type"] === "ds:DomainSpecification"
    );
    if (rootNode) {
      return rootNode["ds:version"];
    }
  } catch (e) {
    // DS is not from 7.0 or later
  }
  // check if the version used is "5.0"
  try {
    // expected root node format for DS-V5
    const rootNode = ds["@graph"].find(
      (el) =>
        Array.isArray(el["@type"]) &&
        el["@type"].includes("sh:NodeShape") &&
        el["@type"].includes("schema:CreativeWork")
    );
    if (rootNode) {
      return "5.0";
    }
  } catch (e) {
    // DS is not from 5.0
  }
  // throw an error if the version could not been determined
  throw new Error(
    "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
  );
};

/*
 * ===========================================
 * functions that ease the UI interaction with DS
 * ===========================================
 */

/**
 * Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
 * If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator (schema:)
 *
 * @param iri {string|string[]} - the input IRI or array of IRIs
 * @return {string}
 */
const prettyPrintCompactedIRI = (iri) => {
  if (Array.isArray(iri)) {
    let result = "";
    for (let i = 0; i < iri.length; i++) {
      result += prettyPrintCompactedIRI(iri[i]);
      if (i + 1 < iri.length) {
        result += " + ";
      }
    }
    return result;
  } else {
    if (iri.startsWith("schema:")) {
      return iri.substring("schema:".length);
    }
    return iri;
  }
};

/**
 * Extracts the indicated schema.org version of a given URL. This functions accepts URLs with following formats
 * https://schema.org/docs/releases.html#v10.0
 * https://schema.org/version/3.4/
 * @param schemaVersionValue {string} - a URL specifying a version of schema.org
 * @return {string} - the version as a simple string
 */
const extractSdoVersionNumber = (schemaVersionValue) => {
  if (schemaVersionValue.includes("schema.org/docs/")) {
    let versionRegex = /.*schema\.org\/docs\/releases\.html#v([0-9.]+)(\/)?/g;
    let match = versionRegex.exec(schemaVersionValue);
    if (match && match[1]) {
      return match[1];
    }
  } else if (schemaVersionValue.includes("schema.org/version/")) {
    let versionRegex = /.*schema\.org\/version\/([0-9.]+)(\/)?/g;
    let match = versionRegex.exec(schemaVersionValue);
    if (match && match[1]) {
      return match[1];
    }
  }
  throw new Error(
    "The given url did not fit the expected format for a schema.org version url."
  );
};

module.exports = {
  getDsSpecificationVersion,
  prettyPrintCompactedIRI,
  extractSdoVersionNumber,
};
