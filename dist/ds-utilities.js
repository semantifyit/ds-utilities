(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DsUtilities = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
/**
 * Returns a Hard Copy (copy by Value) of the given JSON input
 *
 * @param jsonInput {any} - the input
 * @return {any} - the hard copy of the input
 */
const jhcpy = (jsonInput) => {
  return JSON.parse(JSON.stringify(jsonInput));
};

const getLanguageString = (valuesArray, language = undefined) => {
  if (!Array.isArray(valuesArray)) {
    throw new Error("Given valuesArray parameter is not an array, as expected");
  }
  if (language) {
    const entryForGivenLanguage = valuesArray.find(
      (el) => el["@language"] === language
    );
    if (entryForGivenLanguage && entryForGivenLanguage["@value"]) {
      return entryForGivenLanguage["@value"];
    }
  } else {
    // return the first value found
    if (valuesArray[0] && valuesArray[0]["@value"]) {
      return valuesArray[0]["@value"];
    }
  }
  return undefined;
};

module.exports = {
  jhcpy,
  getLanguageString,
};

},{}],2:[function(_dereq_,module,exports){
// Require
const DsUtilitiesBase = _dereq_("./versions/DsUtilitiesBase.js");
const DsUtilitiesV5 = _dereq_("./versions/DsUtilitiesV5.js");
const DsUtilitiesV7 = _dereq_("./versions/DsUtilitiesV7.js");
// Globals
const myDsUtilitiesForCheck = new DsUtilitiesBase();
const availableDsUtilitiesVersions = ["5.0", "7.0"];

// Return a new and corresponding DsUtilities Instance for the given ds specification version (e.g. "5.0")
const getDsUtilitiesForDsSpecVersion = (dsSpecVersion) => {
  if (!availableDsUtilitiesVersions.includes(dsSpecVersion)) {
    throw new Error(
      "The given DS Specification Version " +
        dsSpecVersion +
        " is unknown to DsUtilities."
    );
  }
  switch (dsSpecVersion) {
    case "5.0":
      return new DsUtilitiesV5();
    case "7.0":
      return new DsUtilitiesV7();
  }
};

// Return a new and corresponding DsUtilities Instance for the given domain specification
const getDsUtilitiesForDs = (ds) => {
  const dsSpecVersion = myDsUtilitiesForCheck.getDsSpecificationVersion(ds);
  return getDsUtilitiesForDsSpecVersion(dsSpecVersion);
};

module.exports = {
  getDsUtilitiesForDsSpecVersion,
  getDsUtilitiesForDs,
};

},{"./versions/DsUtilitiesBase.js":3,"./versions/DsUtilitiesV5.js":4,"./versions/DsUtilitiesV7.js":5}],3:[function(_dereq_,module,exports){
/**
 * This is the super class for all DsUtilities classes
 * It includes functions that are shared by all DsUtilities classes
 */
const fBase = _dereq_("./functions/functionsBase.js");

class DsUtilitiesBase {
  constructor() {
    // the dsUtilitiesVersion specifies the version of a DsUtilities Class, which is exactly the same as the corresponding DS specification version
    // DsUtilitiesBase is a super-class for all DsUtilities versions, therefore, it has no corresponding Ds specification version
    this.dsUtilitiesVersion = undefined;
    // functions that handle the structure of DS
    this.getDsSpecificationVersion = fBase.getDsSpecificationVersion;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.initDsPathForDsRoot = initDsPathForDsRoot; todo this should also be version specific
    // this.initDsPathForInternalReference = initDsPathForInternalReference; // from DS-V7 upwards
    // this.addPropertyToDsPath = addPropertyToDsPath;
    // this.addRangeToDsPath = addRangeToDsPath;
    // functions that ease the UI interaction with DS
    this.prettyPrintCompactedIRI = fBase.prettyPrintCompactedIRI;
    this.extractSdoVersionNumber = fBase.extractSdoVersionNumber;
  }
}

module.exports = DsUtilitiesBase;

},{"./functions/functionsBase.js":7}],4:[function(_dereq_,module,exports){
const DsUtilitiesBase = _dereq_("./DsUtilitiesBase.js");
const fV5 = _dereq_("./functions/functionsV5.js");

class DsUtilitiesV5 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "5.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV5.getDsRootNodeV5;
    this.getDsStandardContext = getDsStandardContextV5;
    this.getDsId = getDsIdV7;
    this.reorderDsNode = reorderDsNodeV7;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    this.getDsNodeForPath = getDsNodeForPathV7; // e.g. "$.schema:address/schema:PostalAddress"
    // functions that ease the UI interaction with DS
    this.getDsName = getDsNameV7;
    this.getDsDescription = getDsDescriptionV7;
    this.getDsAuthorName = getDsAuthorV7;
    this.getDsSchemaVersion = getDsSchemaVersionV7;
    this.getDsVersion = getDsVersionV7;
    this.getDsExternalVocabularies = getDsExternalVocabulariesV7;
    this.getDsTargetClasses = getDsTargetClassesV7;
  }
}

module.exports = DsUtilitiesV5;

},{"./DsUtilitiesBase.js":3,"./functions/functionsV5.js":8}],5:[function(_dereq_,module,exports){
const DsUtilitiesBase = _dereq_("./DsUtilitiesBase.js");
const fV7 = _dereq_("./functions/functionsV7.js");

class DsUtilitiesV7 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "7.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV7.getDsRootNodeV7;
    this.getDsStandardContext = fV7.getDsStandardContextV7;
    this.getDsId = fV7.getDsIdV7;
    // this.reorderDsNode = reorderDsNodeV7;
    // this.generateInnerNodeId = generateInnerNodeId;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.getDsNodeForPath = getDsNodeForPathV7; // e.g. "$.schema:address/schema:PostalAddress"
    // functions that ease the UI interaction with DS
    this.getDsName = fV7.getDsNameV7;
    this.getDsDescription = fV7.getDsDescriptionV7;
    this.getDsAuthorName = fV7.getDsAuthorNameV7;
    this.getDsSchemaVersion = fV7.getDsSchemaVersionV7;
    this.getDsVersion = fV7.getDsVersionV7;
    this.getDsExternalVocabularies = fV7.getDsExternalVocabulariesV7;
    // this.getDsTargetClasses = getDsTargetClassesV7;
  }
}

module.exports = DsUtilitiesV7;

},{"./DsUtilitiesBase.js":3,"./functions/functionsV7.js":9}],6:[function(_dereq_,module,exports){
/*
 * This file contains data describing the components and structure used by Domain Specifications in DS-V7
 */

// These are the terms used by a DS Object for DS-V7, listed in the recommended order as they should be listed in their lexical representation
const nodeTermsDsObject = [
  {
    term: "@context",
    required: true,
    valueType: "object",
  },
  {
    term: "@graph",
    required: true,
    valueType: "array",
  },
];

const dsNodePropertyOrder = [
  "@context",
  "@graph",
  "@id",
  "@type",
  "@language",
  "@value",
  "ds:subDSOf",
  "sh:targetClass",
  "sh:targetObjectsOf",
  "sh:targetSubjectsOf",
  "sh:class",
  "sh:datatype",
  "schema:name",
  "schema:description",
  "schema:author",
  "rdfs:comment",
  "ds:version",
  "schema:version",
  "schema:schemaVersion",
  "ds:usedVocabulary",
  "sh:closed",
  "sh:order",
  "sh:path",
  "sh:minCount",
  "sh:maxCount",
  "sh:equals",
  "sh:disjoint",
  "sh:lessThan",
  "sh:lessThanOrEquals",
  "sh:defaultValue",
  "ds:defaultLanguage",
  "sh:minExclusive",
  "sh:minInclusive",
  "sh:maxExclusive",
  "sh:maxInclusive",
  "sh:minLength",
  "sh:maxLength",
  "sh:pattern",
  "sh:flag",
  "sh:languageIn",
  "ds:hasLanguage",
  "sh:uniqueLang",
  "sh:in",
  "sh:hasValue",
  "sh:property",
  "sh:or",
  "sh:node",
];

const standardContext = {
  ds: "https://vocab.sti2.at/ds/",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  schema: "https://schema.org/",
  sh: "http://www.w3.org/ns/shacl#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  "ds:subDSOf": {
    "@type": "@id",
  },
  "ds:usedVocabulary": {
    "@type": "@id",
  },
  "sh:targetClass": {
    "@type": "@id",
  },
  "sh:targetObjectsOf": {
    "@type": "@id",
  },
  "sh:targetSubjectsOf": {
    "@type": "@id",
  },
  "sh:class": {
    "@type": "@id",
  },
  "sh:path": {
    "@type": "@id",
  },
  "sh:datatype": {
    "@type": "@id",
  },
  "sh:equals": {
    "@type": "@id",
  },
  "sh:disjoint": {
    "@type": "@id",
  },
  "sh:lessThan": {
    "@type": "@id",
  },
  "sh:lessThanOrEquals": {
    "@type": "@id",
  },
  "sh:in": {
    "@container": "@list",
  },
  "sh:languageIn": {
    "@container": "@list",
  },
  "sh:or": {
    "@container": "@list",
  },
};

module.exports = {
  nodeTermsDsObject,
  dsNodePropertyOrder,
  standardContext,
};

},{}],7:[function(_dereq_,module,exports){
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
  } catch (e) {}
  // check if the version used is "5.0"
  try {
    // expected root node format for DS-V7 and later
    const rootNode = ds["@graph"].find(
      (el) =>
        Array.isArray(el["@type"]) &&
        el["@type"].includes("sh:NodeShape") &&
        el["@type"].includes("schema:CreativeWork")
    );
    if (rootNode) {
      return "5.0";
    }
  } catch (e) {}
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

},{}],8:[function(_dereq_,module,exports){
/*
 * This file contains the functions used by DsUtilitiesV5
 */

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

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

module.exports = {
  getDsRootNodeV5,
};

},{}],9:[function(_dereq_,module,exports){
/*
 * This file contains the functions used by DsUtilitiesV7
 */

const helper = _dereq_("./../../helperFunctions.js");
const data = _dereq_("./../data/dataV7.js");

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

},{"./../../helperFunctions.js":1,"./../data/dataV7.js":6}]},{},[2])(2)
});
