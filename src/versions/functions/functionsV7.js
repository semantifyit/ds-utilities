/**
 * @file This file contains the functions used by DsUtilitiesV7
 */

const helper = require("./../../helperFunctions.js");
const data = require("./../data/dataV7.js");
const { customAlphabet } = require("nanoid");
const { isObject } = require("../../helperFunctions.js");

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

/**
 * Returns the root node of the given DS
 *
 * @param ds {object} - The input DS
 * @return {object} The detected root node of the DS
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
 * @return {object} the standard @context for DS-V7
 */
const getDsStandardContextV7 = () => {
  return helper.jhcpy(data.standardContext);
};

/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds  {object} - the input DS
 * @return {string} the @id of the given DS
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
 * Reorders all nodes of the given DS according to the DS specification for DS-V7
 *
 * @param ds  {object} - the input DS
 */
const reorderDsV7 = (ds) => {
  if (!isObject(ds)) {
    throw new Error("The given input was not an object, as required.");
  }
  // reorder the meta values (language-tagged strings) in a given array
  const reorderMetaValues = (valuesArray) => {
    for (const valObj of valuesArray) {
      helper.reorderNodeBasedOnNodeTermArray(
        valObj,
        data.nodeTermsLanguageTaggedValue
      );
    }
  };
  const reorderClassNode = (classNode) => {
    reorderDsNodeV7(classNode);
    if (classNode["schema:name"]) {
      reorderMetaValues(classNode["schema:name"]);
    }
    if (classNode["schema:description"]) {
      reorderMetaValues(classNode["schema:description"]);
    }
    if (classNode["sh:property"]) {
      for (const propertyNode of classNode["sh:property"]) {
        reorderPropertyNode(propertyNode);
      }
    }
  };
  const reorderPropertyNode = (propertyNode) => {
    reorderDsNodeV7(propertyNode);
    if (propertyNode["rdfs:comment"]) {
      reorderMetaValues(propertyNode["rdfs:comment"]);
    }
    for (const rangeNode of propertyNode["sh:or"]) {
      reorderDsNodeV7(rangeNode);
      if (rangeNode["sh:node"]) {
        reorderClassNode(rangeNode["sh:node"]);
      }
    }
  };
  // reorder DS object
  helper.reorderNodeBasedOnNodeTermArray(ds, data.nodeTermsDsObject);
  // reorder context
  helper.reorderNodeBasedOnNodeTermArray(
    ds["@context"],
    data.nodeTermsContext()
  );
  // reorder graph nodes (root node + internal references)
  // root node should be the first in the @graph array
  const indexOfRootNode = ds["@graph"].findIndex(
    (el) => el["@type"] === "ds:DomainSpecification"
  );
  if (indexOfRootNode !== 0) {
    ds["@graph"] = [
      ds["@graph"][indexOfRootNode],
      ...ds["@graph"].slice(0, indexOfRootNode),
      ...ds["@graph"].slice(indexOfRootNode + 1),
    ];
  }
  for (const graphNode of ds["@graph"]) {
    reorderClassNode(graphNode);
  }
};

/**
 * Reorders the given DS node according to the DS specification for DS-V7. The corresponding node type is detected automatically.
 *
 * @param dsNode
 */
const reorderDsNodeV7 = (dsNode) => {
  // automatically detect the dsNode type
  // ds object, context, root node, property node, class node, datatype node, enumeration node
  if (!isObject(dsNode)) {
    throw new Error("The given input was not an object, as required.");
  }
  if (dsNode["@type"]) {
    switch (dsNode["@type"]) {
      // root node
      case "ds:DomainSpecification":
        helper.reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsRootNode);
        break;
      // property node
      case "sh:PropertyShape":
        helper.reorderNodeBasedOnNodeTermArray(
          dsNode,
          data.nodeTermsPropertyNode
        );
        break;
      // class node / enumeration node
      case "sh:NodeShape":
        if (dsNode["sh:in"]) {
          helper.reorderNodeBasedOnNodeTermArray(
            dsNode,
            data.nodeTermsEnumerationNode
          );
        } else {
          // class node (restricted, standard class, standard enumeration)
          helper.reorderNodeBasedOnNodeTermArray(
            dsNode,
            data.nodeTermsClassNode
          );
        }
        break;
    }
  } else if (dsNode["@context"]) {
    // ds object
    helper.reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsDsObject);
  } else if (dsNode.ds && dsNode.schema && dsNode.sh) {
    // context
    helper.reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsContext());
  } else if (dsNode["sh:datatype"]) {
    // datatype node
    helper.reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsDataTypeNode);
  } else if (dsNode["sh:node"]) {
    // wrapper for class node / enumeration node - typically no term would be added here
  } else if (dsNode["@value"]) {
    // a language tagged-value
    helper.reorderNodeBasedOnNodeTermArray(
      dsNode,
      data.nodeTermsLanguageTaggedValue
    );
  }
};

/**
 * Creates a new fragment id according to the DS-V7 specification.
 * See https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape
 * It is possible to pass the current DS, this way it is ensured that the generated fragment id has not been used yet in the given DS
 *
 * @param {object} ds - the input DS (optional)
 * @return {string} returns a new the fragment id
 */
const generateInnerNodeIdV7 = (ds = undefined) => {
  let dsId;
  let newId;
  if (ds) {
    dsId = getDsIdV7(ds);
  }
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    5
  );
  do {
    newId = nanoid();
  } while (ds !== undefined && JSON.stringify(ds).includes(dsId + "#" + newId));
  return newId;
};

/*
 * ===========================================
 * functions for the handling of DS Paths
 * ===========================================
 */

const NODE_TYPE_ROOT = "RootNode";
const NODE_TYPE_PROPERTY = "Property";
const NODE_TYPE_CLASS = "Class";
const NODE_TYPE_ENUMERATION = "Enumeration";
const NODE_TYPE_DATATYPE = "DataType";
const NODE_TYPE_REF_ROOT = "RootReference";
const NODE_TYPE_REF_INTERNAL = "InternalReference";
const NODE_TYPE_REF_EXTERNAL = "ExternalReference";
const NODE_TYPE_REF_INTERNAL_EXTERNAL = "InternalExternalReference";
const NODE_TYPE_DEF_INTERNAL = "InternalReferenceDefinition";
const NODE_TYPE_DEF_EXTERNAL = "ExternalReferenceDefinition";
const NODE_TYPE_DEF_INTERNAL_EXTERNAL = "InternalExternalReferenceDefinition";
// "@context" is a special dsPath that points to the @context object of the DS

/**
 * Initializes a DS Path string, based on the given inputs
 *
 * @param [nodeType=RootNode] {string} - the type of the initial token, "RootNode" being the standard. Other possibilities are: "InternalReferenceDefinition", "ExternalReferenceDefinition", "InternalExternalReferenceDefinition"
 * @param [nodeId] {string} - the id of the node which starts the DS path (e.g. "https://semantify.it/ds/_1hRVOT8Q"). Can be left blank in case of "RootNode".
 * @return {string} - the generated DS Path
 */
const dsPathInitV7 = (nodeType = NODE_TYPE_ROOT, nodeId = undefined) => {
  switch (nodeType) {
    case NODE_TYPE_ROOT:
      return "$";
    case NODE_TYPE_DEF_INTERNAL:
      return "#" + nodeId.split("#")[1]; // nodeId = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    case NODE_TYPE_DEF_EXTERNAL:
      return nodeId.split("/").pop(); // nodeId = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
    case NODE_TYPE_DEF_INTERNAL_EXTERNAL:
      return nodeId.split("/").pop(); // nodeId = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    default:
      throw new Error("Unknown node type to initialize a DS Path: " + nodeType);
  }
};

/**
 * Appends a new token to a given DS Path. The inputs and additions depend on the token type to be added.
 *
 * @param dsPath {string} - the given DS Path to augment
 * @param additionType {string} - the kind of addition to be added
 * @param [inputForPath] {string|string[]} - input that depends on the given additionType, which is used for the dsPath addition
 * @return {string} - the resulting DS Path
 */
const dsPathAdditionV7 = (dsPath, additionType, inputForPath = undefined) => {
  // Property
  if (additionType === NODE_TYPE_PROPERTY) {
    return dsPath + "." + inputForPath; // inputForPath = IRI of Property, e.g. schema:url
  }
  // DataType
  if (additionType === NODE_TYPE_DATATYPE) {
    return dsPath + "/" + inputForPath; // inputForPath = IRI of DataType, e.g. xsd:string
  }
  // Class/Enumeration
  if (
    additionType === NODE_TYPE_CLASS ||
    additionType === NODE_TYPE_ENUMERATION
  ) {
    return dsPath + "/" + inputForPath.join(","); // inputForPath = sh:class array, e.g. ["schema:Room", "schema:Product"]
  }
  // Reference - Root Node
  if (additionType === NODE_TYPE_REF_ROOT) {
    return dsPath + "/@$"; // inputForPath is not needed
  }
  // Reference - Internal reference
  if (additionType === NODE_TYPE_REF_INTERNAL) {
    return dsPath + "/@#" + inputForPath.split("#")[1]; // inputForPath = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
  // Reference - External reference
  if (additionType === NODE_TYPE_REF_EXTERNAL) {
    return dsPath + "/@" + inputForPath.split("/").pop(); // inputForPath = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
  }
  // Reference - Internal node of an External reference
  if (additionType === NODE_TYPE_REF_INTERNAL_EXTERNAL) {
    return dsPath + "/@" + inputForPath.split("/").pop(); // inputForPath = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
};

/**
 * Returns a node within the given DS based on the given ds-path.
 *
 * @param ds {object} - The input DS
 * @param dsPath {string} - The input ds-path
 * @return {object} - The node at the given ds-path
 */
const dsPathGetNodeV7 = (ds, dsPath) => {
  // helper function to check if a given class combination array matches another class combination array
  function checkClassMatch(arr1, arr2) {
    return (
      !arr1.find((el) => !arr2.includes(el)) &&
      !arr2.find((el) => !arr1.includes(el))
    );
  }

  //  helper function - actDsObj is an array of ranges
  function getRangeNode(actDsObj, actRestPath, ds) {
    const rootNode = getDsRootNodeV7(ds);
    const pathTokens = actRestPath.split(".");
    const rangeToken = pathTokens[0];
    let actRange;
    let referencedNode;
    // reference node
    if (rangeToken.startsWith("@")) {
      if (rangeToken === "@$") {
        // root node reference
        actRange = actDsObj.find(
          (el) => el["sh:node"] && el["sh:node"]["@id"] === rootNode["@id"]
        );
        referencedNode = rootNode;
      } else if (rangeToken.startsWith("@#")) {
        // internal node reference
        actRange = actDsObj.find(
          (el) =>
            el["sh:node"] &&
            el["sh:node"]["@id"] === rootNode["@id"] + rangeToken.substring(1)
        );
        if (actRange) {
          referencedNode = ds["@graph"].find(
            (el) => el["@id"] === actRange["sh:node"]["@id"]
          );
        }
      } else {
        // external (internal) node reference
        actRange = actDsObj.find(
          (el) =>
            el["sh:node"] &&
            el["sh:node"]["@id"].endsWith(rangeToken.substring(1))
        );
        if (actRange) {
          referencedNode = ds["@graph"].find(
            (el) => el["@id"] === actRange["sh:node"]["@id"]
          );
        }
      }
    } else {
      actRange = actDsObj.find(
        (el) =>
          el["sh:datatype"] === pathTokens[0] ||
          (el["sh:node"] &&
            el["sh:node"]["sh:class"] &&
            checkClassMatch(
              el["sh:node"]["sh:class"],
              pathTokens[0].split(",")
            )) ||
          (el["sh:node"] &&
            el["sh:node"]["@id"].endsWith(pathTokens[0].substring(1)))
      );
    }
    if (!actRange) {
      throw new Error(
        "Could not find a fitting range-node for path-token " + pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      if (actRange["sh:node"]) {
        return actRange["sh:node"];
      } else {
        return actRange;
      }
    } else {
      if (referencedNode) {
        return getPropertyNode(
          referencedNode["sh:property"],
          actRestPath.substring(pathTokens[0].length + 1),
          ds
        );
      } else {
        return getPropertyNode(
          actRange["sh:node"]["sh:property"],
          actRestPath.substring(pathTokens[0].length + 1),
          ds
        );
      }
    }
  }

  // helper function
  function getPropertyNode(actDsObj, actRestPath, ds) {
    const pathTokens = actRestPath.split("/");
    const actProp = actDsObj.find((el) => el["sh:path"] === pathTokens[0]);
    if (!actProp) {
      throw new Error(
        "Could not find a fitting property-node for path-token " + pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      return actProp;
    } else {
      // check next token -> range
      return getRangeNode(
        actProp["sh:or"],
        actRestPath.substring(pathTokens[0].length + 1),
        ds
      );
    }
  }

  if (dsPath === "@context") {
    // special case for @context
    if (!ds["@context"]) {
      throw new Error(
        "The given DS has no @context, which is mandatory for a DS in DS-V7 format."
      );
    }
    return ds["@context"];
  } else if (dsPath.startsWith("$")) {
    // normal DS root
    const dsRoot = getDsRootNodeV7(ds);
    if (dsPath === "$") {
      return dsRoot;
    } else {
      return getPropertyNode(dsRoot["sh:property"], dsPath.substring(2), ds);
    }
  } else {
    // could be:
    // Internal reference definition
    // External reference definition
    // Internal node of an External reference
    const pathTokens = dsPath.split(".");
    const referenceDefinition = ds["@graph"].find((el) =>
      el["@id"].endsWith(pathTokens[0])
    );
    if (!referenceDefinition) {
      throw new Error(
        "Could not find a fitting reference definition for path-token " +
          pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      return referenceDefinition;
    } else {
      return getPropertyNode(
        referenceDefinition["sh:property"],
        dsPath.substring(pathTokens[0].length + 1),
        ds
      );
    }
  }
};

/**
 * Returns the type/role of the given DS Node within the given DS
 *
 * @param dsNode {object?} - the input DS Node
 * @param ds {object} - the input DS
 * @return {string} the type of the given node
 */
const dsPathIdentifyNodeTypeV7 = (dsNode, ds) => {
  const rootNode = getDsRootNodeV7(ds);
  // if there is only 1 attribute that is @id, then this is a reference node
  if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
    if (dsNode["@id"] === rootNode["@id"]) {
      return NODE_TYPE_REF_ROOT;
    } else if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return NODE_TYPE_REF_INTERNAL;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return NODE_TYPE_REF_INTERNAL_EXTERNAL;
    } else {
      return NODE_TYPE_REF_EXTERNAL;
    }
  }
  // nodes in @graph array
  if (dsNode["@type"] === "ds:DomainSpecification") {
    return NODE_TYPE_ROOT; // root node
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    ds["@graph"].find((el) => el["@id"] === dsNode["@id"]) !== undefined
  ) {
    // a reference definition
    if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return NODE_TYPE_DEF_INTERNAL;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return NODE_TYPE_DEF_INTERNAL_EXTERNAL;
    } else {
      return NODE_TYPE_DEF_EXTERNAL;
    }
  }
  // other nodes
  if (dsNode["@type"] === "sh:PropertyShape") {
    return NODE_TYPE_PROPERTY;
  }
  if (dsNode["sh:datatype"] !== undefined) {
    return NODE_TYPE_DATATYPE;
  }
  if (dsNode["@type"] === "sh:NodeShape" && dsNode["sh:in"] !== undefined) {
    return NODE_TYPE_ENUMERATION;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:property"] !== undefined
  ) {
    return NODE_TYPE_CLASS;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:class"] !== undefined
  ) {
    // this could be a standard class or a standard enumeration, we can not tell for sure without SDO Adapter
    return NODE_TYPE_CLASS;
  }
};

/*
 * ===========================================
 * functions that ease the UI interaction with DS
 * ===========================================
 */

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the name (optional)
 * @return {?string} the name of the given DS
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
 * @return {?string} the description of the given DS
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
 * @return {?string} the author name of the given DS
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
 * @return {string} the schema.org version identifier as simple string, e.g. "11.0"
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
 * @return {?string} the ds version as simple string, e.g. "1.04"
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
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
const getDsExternalVocabulariesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["ds:usedVocabulary"]) {
    return rootNode["ds:usedVocabulary"];
  }
  return []; // instead of undefined, send an empty array for convenience
};

/**
 * Returns the target classes (sh:targetClass) of the given DS.
 * sh:targetClass is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes (empty if none)
 */
const getDsTargetClassesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["sh:targetClass"]) {
    return rootNode["sh:targetClass"];
  }
  return []; // instead of undefined, send an empty array for convenience
};

module.exports = {
  getDsRootNodeV7,
  getDsStandardContextV7,
  getDsIdV7,
  reorderDsV7,
  reorderDsNodeV7,
  generateInnerNodeIdV7,
  dsPathInitV7,
  dsPathAdditionV7,
  dsPathGetNodeV7,
  dsPathIdentifyNodeTypeV7,
  getDsNameV7,
  getDsDescriptionV7,
  getDsAuthorNameV7,
  getDsSchemaVersionV7,
  getDsVersionV7,
  getDsExternalVocabulariesV7,
  getDsTargetClassesV7,
};
