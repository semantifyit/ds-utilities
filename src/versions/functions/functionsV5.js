/**
 * @file This file contains the functions used by DsUtilitiesV5
 */

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

const helper = require("./../../helperFunctions.js");
const data = require("./../data/dataV5.js");
const { extractSdoVersionNumber } = require("./functionsBase.js");
/**
 * Returns the root node of the given DS.
 *
 * @param ds {object} - The input DS
 * @return {object} - The detected root node of the DS
 */
const getDsRootNodeV5 = (ds) => {
  if (!ds["@graph"]) {
    throw new Error(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V5 format."
    );
  }
  const rootNode = ds["@graph"].find(
    (el) =>
      Array.isArray(el["@type"]) &&
      el["@type"].includes("sh:NodeShape") &&
      el["@type"].includes("schema:CreativeWork")
  );
  if (!rootNode) {
    throw new Error(
      "The given DS has no identifiable root node in DS-V5 format."
    );
  }
  return rootNode;
};

/**
 * Returns the standard @context for DS-V5
 *
 * @return {object} - the standard @context for DS-V5
 */
const getDsStandardContextV5 = () => {
  return helper.jhcpy(data.standardContext);
};

/**
 * Returns the @id of the given DS (for DS-V5 this @id is found in the outermost object).
 * A DS @id is mandatory for DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string} - the @id of the given DS
 */
const getDsIdV5 = (ds) => {
  if (!ds["@id"]) {
    throw new Error(
      "The given DS has no @id, which is mandatory for a DS in DS-V5 format."
    );
  }
  return ds["@id"];
};

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the name of the given DS
 */
const getDsNameV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:name"]) {
    return rootNode["schema:name"];
  }
  return undefined;
};

/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the description of the given DS
 */
const getDsDescriptionV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:description"]) {
    return rootNode["schema:description"];
  }
  return undefined;
};

/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the author name of the given DS
 */
const getDsAuthorV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
    return rootNode["schema:author"]["schema:name"];
  }
  return undefined;
};

/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string} the schema.org version identifier as simple string, e.g. "11.0"
 */
const getDsSchemaVersionV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (!rootNode["schema:schemaVersion"]) {
    throw new Error(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format."
    );
  }
  return extractSdoVersionNumber(rootNode["schema:schemaVersion"]);
};

/**
 * Returns the version (schema:version) of the given DS.
 * schema:version is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the ds version as simple string, e.g. "1.04"
 */
const getDsVersionV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:version"]) {
    return rootNode["schema:version"];
  }
  return undefined;
};

/**
 * Returns the used external vocabularies (ds:usedVocabularies) of the given DS.
 * ds:usedVocabularies is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
const getDsExternalVocabulariesV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["ds:usedVocabularies"]) {
    return rootNode["ds:usedVocabularies"];
  }
  return []; // instead of undefined, send an empty array for convenience
};

/**
 * Returns the target classes (sh:targetClass) of the given DS.
 * sh:targetClass is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes
 */
const getDsTargetClassesV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (!rootNode["sh:targetClass"]) {
    throw new Error(
      "The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format."
    );
  }
  // return targetClass always as array for convenience
  if (!Array.isArray(rootNode["sh:targetClass"])) {
    return [rootNode["sh:targetClass"]];
  }
  return rootNode["sh:targetClass"];
};

module.exports = {
  getDsRootNodeV5,
  getDsStandardContextV5,
  getDsIdV5,
  getDsNameV5,
  getDsDescriptionV5,
  getDsAuthorV5,
  getDsSchemaVersionV5,
  getDsVersionV5,
  getDsExternalVocabulariesV5,
  getDsTargetClassesV5,
};
