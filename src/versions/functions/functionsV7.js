/**
 * @file This file contains the functions used by DsUtilitiesV7
 */

const data = require("./../data/dataV7.js");
const dsPathNodeTypes = data.dsPathNodeTypesV7;
const { customAlphabet } = require("nanoid");
const {
  isObject,
  cloneJson,
  reorderNodeBasedOnNodeTermArray,
  getLanguageString,
  deepEqual,
} = require("../../helperFunctions.js");
const { prettyPrintCompactedIRI } = require("./functionsBase.js");
const {
  dataTypeMappingToLabel,
  dataTypeMappingToSchema,
  dsGrammarNodeTypesV7,
} = require("../data/dataV7.js");

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

/**
 * Returns the root node of the given DS (reference)
 *
 * @param ds {object} - The input DS
 * @return {object} The detected root node of the DS (reference)
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
 * Returns the standard @context for DS-V7 (clone - no reference).
 *
 * @return {object} the standard @context for DS-V7
 */
const getDsStandardContextV7 = () => {
  return cloneJson(data.standardContext);
};

/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds {object} - the input DS
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
 * @param ds {object} - the input DS
 */
const reorderDsV7 = (ds) => {
  if (!isObject(ds)) {
    throw new Error("The given input was not an object, as required.");
  }
  // reorder the meta values (language-tagged strings) in a given array
  const reorderMetaValues = (valuesArray) => {
    for (const valObj of valuesArray) {
      reorderNodeBasedOnNodeTermArray(
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
  reorderNodeBasedOnNodeTermArray(ds, data.nodeTermsDsObject);
  // reorder context
  reorderNodeBasedOnNodeTermArray(ds["@context"], data.nodeTermsContext());
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
        reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsRootNode);
        break;
      // property node
      case "sh:PropertyShape":
        reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsPropertyNode);
        break;
      // class node / enumeration node
      case "sh:NodeShape":
        if (dsNode["sh:in"]) {
          reorderNodeBasedOnNodeTermArray(
            dsNode,
            data.nodeTermsEnumerationNode
          );
        } else {
          // class node (restricted, standard class, standard enumeration)
          reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsClassNode);
        }
        break;
    }
  } else if (dsNode["@context"]) {
    // ds object
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsDsObject);
  } else if (dsNode.ds && dsNode.schema && dsNode.sh) {
    // context
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsContext());
  } else if (dsNode["sh:datatype"]) {
    // datatype node
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsDataTypeNode);
  } else if (dsNode["sh:node"]) {
    // wrapper for class node / enumeration node - typically no term would be added here
  } else if (dsNode["@value"]) {
    // a language tagged-value
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsLanguageTaggedValue);
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

/**
 * Returns a human-readable label for the given DS-DataType (e.g. "xsd:string" -> "Text")
 *
 * @param {string} dsDataType - a compacted IRI representing a DataType of DS-V7 (from XSD or RDF, e.g. "xsd:string" or "rdf:langString")
 * @return {string} - a human-readable label for the given DataType
 */
const getDataTypeLabelV7 = (dsDataType) => {
  const match = dataTypeMappingToLabel[dsDataType];
  if (!match) {
    throw new Error(
      "Given input '" +
        dsDataType +
        "' is not a valid xsd/rdf datatype in DS-V7."
    );
  }
  return match;
};

/**
 * Returns the corresponding DS-V7 datatype (XSD/RDF) for a given schema.org datatype.
 * ATTENTION: for schema:Text the value xsd:string is always returned (no rdf:langString or rdf:HTML)
 *
 * @param {string} schemaDataType - a compacted IRI representing a DataType of schema.org (e.g. schema:Text)
 * @return {string} - the corresponding DS-V7 Datatype (from XSD or RDF)
 */
const getDsDataTypeForSchemaDataTypeV7 = (schemaDataType) => {
  const match = Object.keys(dataTypeMappingToSchema).find((el) => {
    return dataTypeMappingToSchema[el] === schemaDataType;
  });
  if (!match) {
    throw new Error(
      "Given input '" +
        schemaDataType +
        "' is not a valid schema.org datatype in DS-V7."
    );
  }
  return match;
};

/**
 * Returns the corresponding schema.org datatype for a given DS-V7 datatype (XSD/RDF)
 *
 * @param {string} dsDataType - a compacted IRI representing a DataType of DS-V7 (from XSD or RDF, e.g. "xsd:string" or "rdf:langString")
 * @return {string} - the corresponding schema.org Datatype
 */
const getSchemaDataTypeForDsDataTypeV7 = (dsDataType) => {
  const match = dataTypeMappingToSchema[dsDataType];
  if (!match) {
    throw new Error(
      "Given input '" +
        dsDataType +
        "' is not a valid xsd/rdf datatype in DS-V7."
    );
  }
  return match;
};

/**
 * Returns the grammar-type of the given DS Node within the given populated DS. It is possible to pass an SDO-Adapter to tell a standard enumeration apart from a standard class. If no SDO-Adapter is given, a standard class is assumed. If a reference node is passed (not an enumeration member) then the grammar type of the referenced node is returned (e.g. internal reference may point to a Restricted Class node -> "RestrictedClass").
 *
 * @param dsNode {object?} - the input DS Node
 * @param ds {object} - the input DS (populated)
 * @param sdoAdapter {SDOAdapter?} - A SDO-Adapter instance (already initialized with the wished vocabularies) -
 * @return {string} the type of the given node
 */
const identifyDsGrammarNodeTypeV7 = (dsNode, ds, sdoAdapter = undefined) => {
  const rootNode = getDsRootNodeV7(ds);
  // check if it is @context
  const contextNode = dsPathGetNodeV7(ds, "@context");
  if (deepEqual(dsNode, contextNode)) {
    return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_CONTEXT;
  }
  // check if it is the DS root node (is also a restricted class, but we have an own identifier for the root node)
  if (deepEqual(dsNode, rootNode)) {
    return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_ROOT;
  }
  // property
  if (dsNode["@type"] === "sh:PropertyShape") {
    return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_PROPERTY;
  }
  // datatype
  if (dsNode["sh:datatype"]) {
    return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_DATATYPE;
  }
  // class or enumeration
  if (dsNode["@type"] === "sh:NodeShape") {
    // restricted class
    if (dsNode["sh:property"]) {
      return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_CLASS_R;
    }
    // restricted enumeration
    if (dsNode["sh:in"]) {
      return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_ENUMERATION_R;
    }
    if (dsNode["sh:class"].length === 1 && sdoAdapter) {
      try {
        sdoAdapter.getEnumeration(dsNode["sh:class"][0]);
        return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_ENUMERATION_S;
      } catch (e) {
        // not an enumeration
        return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_CLASS_S;
      }
    } else {
      // if no sdo adapter is given, then a standard class is expected
      return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_CLASS_S;
    }
  }
  // reference or enumeration member
  if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
    // node reference
    const match = ds["@graph"].find((el) => {
      return dsNode["@id"] === el["@id"];
    });
    if (match) {
      // let this function check the referenced object
      return identifyDsGrammarNodeTypeV7(match, ds, sdoAdapter);
    }
    // else: assume it is an enumeration member
    return dsGrammarNodeTypesV7.DS_GRAMMAR_NODE_TYPE_ENUMERATIONMEMBER;
  }
  throw new Error("Could not find a match for the given DS Node.");
};

/*
 * ===========================================
 * functions for the handling of DS Paths
 * ===========================================
 */

/**
 * Initializes a DS Path string, based on the given inputs
 *
 * @param [nodeType=RootNode] {string} - the type of the initial token, "RootNode" being the standard. Other possibilities are: "InternalReferenceDefinition", "ExternalReferenceDefinition", "InternalExternalReferenceDefinition"
 * @param [nodeId] {string} - the id of the node which starts the DS path (e.g. "https://semantify.it/ds/_1hRVOT8Q"). Can be left blank in case of "RootNode".
 * @return {string} - the generated DS Path
 */
const dsPathInitV7 = (
  nodeType = dsPathNodeTypes.DS_PATH_NODE_TYPE_ROOT,
  nodeId = undefined
) => {
  switch (nodeType) {
    case dsPathNodeTypes.DS_PATH_NODE_TYPE_ROOT:
      return "$";
    case dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_INTERNAL:
      return "#" + nodeId.split("#")[1]; // nodeId = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    case dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_EXTERNAL:
      return nodeId.split("/").pop(); // nodeId = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
    case dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL:
      return nodeId.split("/").pop(); // nodeId = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    case dsPathNodeTypes.DS_PATH_NODE_TYPE_CONTEXT:
      return "@context";
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
  if (additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_PROPERTY) {
    return dsPath + "." + inputForPath; // inputForPath = IRI of Property, e.g. schema:url
  }
  // DataType
  if (additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_DATATYPE) {
    return dsPath + "/" + inputForPath; // inputForPath = IRI of DataType, e.g. xsd:string
  }
  // Class/Enumeration
  if (
    additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_CLASS ||
    additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_ENUMERATION
  ) {
    return dsPath + "/" + inputForPath.join(","); // inputForPath = sh:class array, e.g. ["schema:Room", "schema:Product"]
  }
  // Reference - Root Node
  if (additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_ROOT) {
    return dsPath + "/@$"; // inputForPath is not needed
  }
  // Reference - Internal reference
  if (additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_INTERNAL) {
    return dsPath + "/@#" + inputForPath.split("#")[1]; // inputForPath = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
  // Reference - External reference
  if (additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_EXTERNAL) {
    return dsPath + "/@" + inputForPath.split("/").pop(); // inputForPath = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
  }
  // Reference - Internal node of an External reference
  if (
    additionType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL
  ) {
    return dsPath + "/@" + inputForPath.split("/").pop(); // inputForPath = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
};

/**
 * Returns a node within the given DS based on the given ds-path. (reference)
 *
 * @param ds {object} - The input DS
 * @param dsPath {string} - The input ds-path
 * @param resolveReference {boolean} - If true, and the last token of the path is a reference node, then the referenced objected will be returned. Else the referencing object will be returned.
 * @return {object} - The node at the given ds-path (by reference)
 */
const dsPathGetNodeV7 = (ds, dsPath, resolveReference = false) => {
  // helper function to check if a given class combination array matches another class combination array
  function checkClassMatch(arr1, arr2) {
    return (
      !arr1.find((el) => !arr2.includes(el)) &&
      !arr2.find((el) => !arr1.includes(el))
    );
  }

  //  helper function - actDsObj is an array of ranges
  function getRangeNode(actDsObj, actRestPath, ds, resolveReference) {
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
      if (resolveReference && referencedNode) {
        return referencedNode;
      } else if (actRange["sh:node"]) {
        return actRange["sh:node"];
      } else {
        return actRange;
      }
    } else {
      if (referencedNode) {
        return getPropertyNode(
          referencedNode["sh:property"],
          actRestPath.substring(pathTokens[0].length + 1),
          ds,
          resolveReference
        );
      } else {
        return getPropertyNode(
          actRange["sh:node"]["sh:property"],
          actRestPath.substring(pathTokens[0].length + 1),
          ds,
          resolveReference
        );
      }
    }
  }

  // helper function
  function getPropertyNode(actDsObj, actRestPath, ds, resolveReference) {
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
        ds,
        resolveReference
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
      return getPropertyNode(
        dsRoot["sh:property"],
        dsPath.substring(2),
        ds,
        resolveReference
      );
    }
  } else {
    // could be:
    // Internal reference definition
    // External reference definition
    // Internal node of an External reference definition
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
        ds,
        resolveReference
      );
    }
  }
};

/**
 * Returns an array of objects, representing the tokens of a given ds-path. (reference)
 * https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/dspath
 *
 * @param ds {object} - The input DS
 * @param dsPath {string} - The input ds-path
 * @return {array} - The node at the given ds-path (reference)
 */
const tokenizeDsPathV7 = (ds, dsPath) => {
  let currentPath = "";
  let restPath = dsPath;
  let result = [];

  while (restPath !== "") {
    let currentToken;
    if (restPath === dsPath && restPath.startsWith("$")) {
      // root node
      currentToken = "$";
    } else if (restPath === dsPath && restPath.startsWith("@context")) {
      // context node
      currentToken = "@context";
    } else if (restPath === dsPath && restPath.startsWith("#")) {
      // Internal Reference Definition
      let limiter = restPath.indexOf(".");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else if (
      restPath === dsPath &&
      !dsPath.startsWith("#") &&
      !dsPath.startsWith("@") &&
      !dsPath.startsWith("$")
    ) {
      // External Reference Definition
      let limiter = restPath.indexOf(".");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else if (restPath.startsWith(".")) {
      // property
      let limiter = restPath.indexOf("/");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else if (restPath.startsWith("/")) {
      // root node reference
      // internal reference
      // external reference (without fragment part) or Internal node of external reference (has "#fragmentId" at the end)
      // class/enumeration, datatype
      let limiter = restPath.indexOf(".");
      currentToken = restPath.substring(
        0,
        limiter !== -1 ? limiter : undefined
      );
    } else {
      throw new Error(
        "Could not find a valid token match for '" + restPath + "'."
      );
    }
    currentPath = currentPath + currentToken;
    restPath = restPath.substring(currentToken.length);
    result.push(createDsPathToken(ds, currentToken, currentPath, restPath));
  }
  return result;
};

const createDsPathToken = (ds, token, currentPath, restPath) => {
  const dsNodeResolvedReference = dsPathGetNodeV7(ds, currentPath, true);
  const dsNodeUnresolvedReference = dsPathGetNodeV7(ds, currentPath, false);
  const grammarNodeType = identifyDsGrammarNodeTypeV7(
    dsNodeResolvedReference,
    ds
  );
  const dsPathNodeType = dsPathIdentifyNodeTypeV7(
    dsNodeUnresolvedReference,
    ds
  );
  let label;
  if (token === "@context") {
    label = "@context";
  } else if (
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_ROOT ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_CLASS ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_ENUMERATION ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_INTERNAL ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_EXTERNAL ||
    dsPathNodeType ===
      dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_ROOT ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_INTERNAL ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_EXTERNAL ||
    dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL
  ) {
    label = prettyPrintCompactedIRI(dsNodeResolvedReference["sh:class"]);
  } else if (dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_PROPERTY) {
    label = prettyPrintCompactedIRI(dsNodeResolvedReference["sh:path"]);
  } else if (dsPathNodeType === dsPathNodeTypes.DS_PATH_NODE_TYPE_DATATYPE) {
    label = dataTypeMappingToLabel[dsNodeResolvedReference["sh:datatype"]];
  }
  return {
    token,
    label,
    grammarNodeType,
    dsPathNodeType,
    currentPath,
    restPath,
  };
};

/**
 * Returns the ds-path-type of the given DS Node within the given DS
 *
 * @param dsNode {object?} - the input DS Node
 * @param ds {object} - the input DS
 * @return {string} the ds-path-type of the given node
 */
const dsPathIdentifyNodeTypeV7 = (dsNode, ds) => {
  const rootNode = getDsRootNodeV7(ds);
  // check if it is @context
  const contextNode = dsPathGetNodeV7(ds, "@context");
  if (deepEqual(dsNode, contextNode)) {
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_CONTEXT;
  }

  if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
    // if there is only 1 attribute that is @id, then this is a reference node
    if (dsNode["@id"] === rootNode["@id"]) {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_ROOT;
    } else if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_INTERNAL;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_INTERNAL_EXTERNAL;
    } else {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_REF_EXTERNAL;
    }
  }
  // nodes in @graph array
  if (dsNode["@type"] === "ds:DomainSpecification") {
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_ROOT; // root node
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    ds["@graph"].find((el) => el["@id"] === dsNode["@id"]) !== undefined
  ) {
    // a reference definition
    if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_INTERNAL;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_INTERNAL_EXTERNAL;
    } else {
      return dsPathNodeTypes.DS_PATH_NODE_TYPE_DEF_EXTERNAL;
    }
  }
  // other nodes
  if (dsNode["@type"] === "sh:PropertyShape") {
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_PROPERTY;
  }
  if (dsNode["sh:datatype"] !== undefined) {
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_DATATYPE;
  }
  if (dsNode["@type"] === "sh:NodeShape" && dsNode["sh:in"] !== undefined) {
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_ENUMERATION;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:property"] !== undefined
  ) {
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_CLASS;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:class"] !== undefined
  ) {
    // this could be a standard class or a standard enumeration, we can not tell for sure without SDO Adapter
    return dsPathNodeTypes.DS_PATH_NODE_TYPE_CLASS;
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
    return getLanguageString(rootNode["schema:name"], language);
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
    return getLanguageString(rootNode["schema:description"], language);
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
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS (clone - no reference).
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
const getDsExternalVocabulariesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["ds:usedVocabulary"]) {
    return cloneJson(rootNode["ds:usedVocabulary"]);
  }
  return []; // instead of undefined, send an empty array for convenience
};

/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes (empty if none)
 */
const getDsTargetClassesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["sh:targetClass"]) {
    return cloneJson(rootNode["sh:targetClass"]);
  }
  return []; // instead of undefined, send an empty array for convenience
};

//
/**
 * Returns true if the given classes are a valid match for the given targetClasses following the DS-V7 semantics
 * This matching is important for the Class-SubClass relationship (e.g. subDS, or range subclass)
 * https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/verificationreport/ds-verification#semantics-for-class-matching
 * This function needs the SDO-Adapter library to work - https://www.npmjs.com/package/schema-org-adapter
 *
 * @param targetClasses {string[]} - The target classes (DS)
 * @param classesToCheck {string[]} - The classes to be checked (Data)
 * @param sdoAdapter {SDOAdapter} - A SDO-Adapter instance (already initialized with the wished vocabularies)
 * @return {boolean} - True if the given classes to check are valid for the given target classes
 */
const checkClassMatchV7 = (targetClasses, classesToCheck, sdoAdapter) => {
  // get a set of all superclasses (including themselves) from the classesToCheck
  const superClassesArray = [];
  classesToCheck.map((c) =>
    superClassesArray.push(...[c, ...sdoAdapter.getClass(c).getSuperClasses()])
  );
  const superClassSet = Array.from(new Set(superClassesArray));
  return targetClasses.every((tc) => superClassSet.includes(tc));
};

module.exports = {
  getDsRootNodeV7,
  getDsStandardContextV7,
  getDsIdV7,
  reorderDsV7,
  reorderDsNodeV7,
  generateInnerNodeIdV7,
  getDataTypeLabelV7,
  getDsDataTypeForSchemaDataTypeV7,
  getSchemaDataTypeForDsDataTypeV7,
  identifyDsGrammarNodeTypeV7,
  dsPathInitV7,
  dsPathAdditionV7,
  dsPathGetNodeV7,
  dsPathIdentifyNodeTypeV7,
  tokenizeDsPathV7,
  getDsNameV7,
  getDsDescriptionV7,
  getDsAuthorNameV7,
  getDsSchemaVersionV7,
  getDsVersionV7,
  getDsExternalVocabulariesV7,
  getDsTargetClassesV7,
  checkClassMatchV7,
};
