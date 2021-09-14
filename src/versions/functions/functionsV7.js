/*
 * This file contains the functions used by DsUtilitiesV7
 */

const helper = require("./../../helperFunctions.js");
const data = require("./../data/dataV7.js");

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

/**
 * Returns the root node of the given DS
 *
 * @param ds {object} - The input DS
 * @return {object} - The detected root node of the DS
 */
const getDsRootNodeV7 = (ds) => {
  if (!ds["@graph"]) {
    throw new Error(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V7 format."
    );
  }
  const rootNode = ds["@graph"].find(
    (el) => el["@type"] === "ds:DomainSpecification"
  );
  if (!rootNode) {
    throw new Error(
      "The given DS has no identifiable root node in DS-V7 format."
    );
  }
  return rootNode;
};

/**
 * Returns the standard @context for DS-V7
 *
 * @return {object} - the standard @context for DS-V7
 */
const getDsStandardContextV7 = () => {
  return helper.jhcpy(data.standardContext);
};

/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds  {object} - the input DS
 * @return {string} - the @id of the given DS
 */
const getDsIdV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (!rootNode["@id"]) {
    throw new Error(
      "The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["@id"];
};

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the name (optional)
 * @return {string|undefined} - the name of the given DS
 */
const getDsNameV7 = (ds, language = undefined) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:name"]) {
    return helper.getLanguageString(rootNode["schema:name"], language);
  }
  return undefined;
};

/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the description (optional)
 * @return {string|undefined} - the description of the given DS
 */
const getDsDescriptionV7 = (ds, language = undefined) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:description"]) {
    return helper.getLanguageString(rootNode["schema:description"], language);
  }
  return undefined;
};

/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string|undefined} - the author name of the given DS
 */
const getDsAuthorNameV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
    return rootNode["schema:author"]["schema:name"];
  }
  return undefined;
};

/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string|undefined} - the schema.org version identifier as simple string, e.g. "11.0"
 */
const getDsSchemaVersionV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (!rootNode["schema:schemaVersion"]) {
    throw new Error(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["schema:schemaVersion"];
};

/**
 * Returns the used ds version (schema:version) of the given DS.
 * schema:version is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string|undefined} - the ds version as simple string, e.g. "1.04"
 */
const getDsVersionV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:version"]) {
    return rootNode["schema:version"];
  }
  return undefined;
};

/**
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS.
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} - array with the used external vocabularies (empty if none)
 */
const getDsExternalVocabulariesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["ds:usedVocabulary"]) {
    return rootNode["ds:usedVocabulary"];
  }
  return []; // instead of undefined, send an empty array for convenience
};

/*
 * ===========================================
 * functions that ease the UI interaction with DS
 * ===========================================
 */

module.exports = {
  getDsRootNodeV7,
  getDsStandardContextV7,
  getDsIdV7,
  getDsNameV7,
  getDsDescriptionV7,
  getDsAuthorNameV7,
  getDsSchemaVersionV7,
  getDsVersionV7,
  getDsExternalVocabulariesV7,
};
