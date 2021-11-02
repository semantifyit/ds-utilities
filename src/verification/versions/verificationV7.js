/*
 * ===========================================
 * functions for the meta verification
 * ===========================================
 */

const VerificationReport = require("../../verification/VerificationReport.js");
const { isObject, cloneJson } = require("../../helperFunctions.js");
const ErrorEntry = require("../../verification/ErrorEntry.js");
const dataV7 = require("../../versions/data/dataV7.js");
const fv7 = require("../../versions/functions/functionsV7.js");
const nodeTypes = fv7.nodeTypesV7;
/**
 * Returns a meta verification report
 *
 * @param ds {object} - the input DS
 * @param config {object} - optional config object with options for the meta verification
 * @return {object} verification report
 */
const verifyDsV7 = (ds, config = {}) => {
  const verificationReport = new VerificationReport();
  try {
    if (!isObject(ds)) {
      verificationReport.addErrorEntry(
        new ErrorEntry(
          "Error",
          "$",
          "The given input was not an object, as required."
        )
      );
    }
    // check compliance at DS Object level
    checkCompliance(
      verificationReport,
      null,
      ds,
      generateNodeComplianceRules(
        dataV7.nodeTermsDsObject,
        config.nodeTermsDsObject
      )
    );
    // check compliance of the @context
    if (isObject(ds["@context"])) {
      checkCompliance(
        verificationReport,
        "@context",
        ds["@context"],
        generateNodeComplianceRules(
          dataV7.nodeTermsContext(),
          config.nodeTermsContext
        )
      );
    }
    // check compliance of root node
    const rootNode = fv7.getDsRootNodeV7(ds);
    verifyClassNode(
      ds,
      rootNode,
      verificationReport,
      fv7.dsPathInitV7(nodeTypes.NODE_TYPE_ROOT),
      config,
      true
    );
    // check compliance of other @graph nodes (internal references)
    for (const graphNode of ds["@graph"]) {
      if (graphNode["@id"] === rootNode["@id"]) {
        continue;
      }
      verifyClassNode(
        ds,
        graphNode,
        verificationReport,
        fv7.dsPathInitV7(nodeTypes.NODE_TYPE_DEF_INTERNAL, graphNode["@id"]),
        config,
        false
      );
    }
    return verificationReport.toJson();
  } catch (e) {
    verificationReport.addErrorEntry(
      new ErrorEntry(
        "Critical",
        "$",
        "There was a critical error during the verification: " + e
      )
    );
    return verificationReport.toJson();
  }
};

const verifyClassNode = (
  ds,
  classNode,
  verificationReport,
  path,
  config,
  isRoot
) => {
  let complianceRules;
  if (isRoot) {
    complianceRules = generateNodeComplianceRules(
      dataV7.nodeTermsRootNode,
      config.nodeTermsRootNode
    );
  } else {
    complianceRules = generateNodeComplianceRules(
      dataV7.nodeTermsClassNode,
      config.nodeTermsClassNode
    );
  }
  // check the class node itself
  checkCompliance(verificationReport, path, classNode, complianceRules);
  // recursive check of properties
  if (Array.isArray(classNode["sh:property"])) {
    for (const pNode of classNode["sh:property"]) {
      verifyPropertyNode(
        ds,
        pNode,
        verificationReport,
        fv7.dsPathAdditionV7(
          path,
          nodeTypes.NODE_TYPE_PROPERTY,
          pNode["sh:path"]
        ),
        config
      );
    }
  }
};

const verifyEnumerationNode = (
  ds,
  enumerationNode,
  verificationReport,
  path,
  config
) => {
  // check the property node itself
  checkCompliance(
    verificationReport,
    path,
    enumerationNode,
    generateNodeComplianceRules(
      dataV7.nodeTermsEnumerationNode,
      config.nodeTermsEnumerationNode
    )
  );
  // check sh:in values, if present
  if (Array.isArray(enumerationNode["sh:in"])) {
    for (const enumValue of enumerationNode["sh:in"]) {
      // enum values must be objects that have an @id with a string as value
      if (!isObject(enumValue)) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "An enumeration has an unexpected entry for 'sh:in'."
          )
        );
      } else {
        if (enumValue["@id"] === undefined) {
          verificationReport.addErrorEntry(
            new ErrorEntry("Error", path, "An enumeration value has no '@id'.")
          );
        } else if (typeof enumValue["@id"] !== "string") {
          verificationReport.addErrorEntry(
            new ErrorEntry(
              "Error",
              path,
              "An enumeration value has an '@id' that is not a string."
            )
          );
        }
        for (const term of Object.keys(enumValue)) {
          if (term !== "@id") {
            verificationReport.addErrorEntry(
              new ErrorEntry(
                "Warning",
                path,
                "Additional term '" + term + " is being used."
              )
            );
          }
        }
      }
    }
  }
};

const verifyPropertyNode = (
  ds,
  propertyNode,
  verificationReport,
  path,
  config
) => {
  // check the property node itself
  checkCompliance(
    verificationReport,
    path,
    propertyNode,
    generateNodeComplianceRules(
      dataV7.nodeTermsPropertyNode,
      config.nodeTermsPropertyNode
    )
  );
  // recursive check of ranges
  if (Array.isArray(propertyNode["sh:or"])) {
    for (const rNode of propertyNode["sh:or"]) {
      let nodeType;
      let nodeToCheck;
      if (rNode["sh:node"]) {
        nodeType = fv7.dsPathIdentifyNodeTypeV7(rNode["sh:node"], ds);
        nodeToCheck = rNode["sh:node"];
      } else {
        nodeType = fv7.dsPathIdentifyNodeTypeV7(rNode, ds);
        nodeToCheck = rNode;
      }
      let newPath;
      switch (nodeType) {
        case nodeTypes.NODE_TYPE_CLASS:
          try {
            newPath = fv7.dsPathAdditionV7(
              path,
              nodeType,
              nodeToCheck["sh:class"]
            );
          } catch (e) {
            // class node has no sh:class definition
            newPath = path;
          }
          verifyClassNode(
            ds,
            nodeToCheck,
            verificationReport,
            newPath,
            config,
            false
          );
          break;
        case nodeTypes.NODE_TYPE_ENUMERATION:
          try {
            newPath = fv7.dsPathAdditionV7(
              path,
              nodeType,
              nodeToCheck["sh:class"]
            );
          } catch (e) {
            // class node has no sh:class definition
            newPath = path;
          }
          verifyEnumerationNode(
            ds,
            nodeToCheck,
            verificationReport,
            newPath,
            config
          );
          break;
        case nodeTypes.NODE_TYPE_DATATYPE:
          try {
            newPath = fv7.dsPathAdditionV7(
              path,
              nodeType,
              nodeToCheck["sh:datatype"]
            );
          } catch (e) {
            // class node has no sh:datatype definition
            newPath = path;
          }
          verifyDataTypeNode(
            ds,
            nodeToCheck,
            verificationReport,
            newPath,
            config
          );
          break;
      }
    }
  }
};

const verifyDataTypeNode = (
  ds,
  dataTypeNode,
  verificationReport,
  path,
  config
) => {
  // check the datatype node itself
  checkCompliance(
    verificationReport,
    path,
    dataTypeNode,
    generateNodeComplianceRules(
      dataV7.nodeTermsDataTypeNode,
      config.nodeTermsDataTypeNode
    )
  );
};

const checkCompliance = (
  verificationReport,
  path,
  inputObject,
  nodeComplianceRules
) => {
  for (const termObj of nodeComplianceRules) {
    // check if required but not used
    if (termObj.required === true && inputObject[termObj.term] === undefined) {
      verificationReport.addErrorEntry(
        new ErrorEntry(
          "Error",
          path,
          "Term '" + termObj.term + "' is required but not used."
        )
      );
      continue;
    }
    // if used, check valueType, value, and valueIn
    if (inputObject[termObj.term] !== undefined) {
      // valueType
      const valType = getLiteralType(inputObject[termObj.term]);
      if (
        termObj.valueType &&
        termObj.valueType !== "any" &&
        valType !== termObj.valueType
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" +
              termObj.term +
              "' requires a value with datatype '" +
              termObj.valueType +
              "', but has the datatype '" +
              valType +
              "'."
          )
        );
        continue;
      } else if (
        valType === "array" &&
        inputObject[termObj.term].length === 0
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" + termObj.term + "' has an empty array as value."
          )
        );
      }
      // value
      if (
        termObj.value &&
        !isSameValue(inputObject[termObj.term], termObj.value)
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" +
              termObj.term +
              "' requires the value '" +
              getCleanOutputString(termObj.value) +
              "', but has the value '" +
              getCleanOutputString(inputObject[termObj.term]) +
              "'."
          )
        );
      }
      // valueIn
      if (
        termObj.valueIn &&
        !termObj.valueIn.includes(inputObject[termObj.term])
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" +
              termObj.term +
              "' must have a value from an expected set, which does not include the given value '" +
              getCleanOutputString(inputObject[termObj.term]) +
              "'."
          )
        );
      }
    }
  }
  // check if there are additional entries that are not expected (could be extensions?)
  const additionalTerms = Object.keys(inputObject).filter(
    (el) => !nodeComplianceRules.find((el2) => el2.term === el)
  );
  for (const at of additionalTerms) {
    verificationReport.addErrorEntry(
      new ErrorEntry(
        "Warning",
        path,
        "Additional term '" + at + " is being used."
      )
    );
  }
};

// returns false if the values are not the same
// at this point the inputs are known to have the same datatype
const isSameValue = (val1, val2) => {
  if (isObject(val1)) {
    // make sure both input objects have the same keys with the same values
    if (!checkSameKeys(val1, val2)) {
      return false;
    } else {
      for (const v of Object.keys(val1)) {
        if (!isSameValue(val1[v], val2[v])) {
          return false;
        }
      }
    }
    return true;
  } else {
    return val1 === val2;
  }
};

// returns true if both given objects have the same keys
const checkSameKeys = (obj1, obj2) => {
  const diff1 = Object.keys(obj1).filter(
    (el) => !Object.keys(obj2).includes(el)
  );
  const diff2 = Object.keys(obj2).filter(
    (el) => !Object.keys(obj1).includes(el)
  );
  return diff1.length === 0 && diff2.length === 0;
};

// returns the datatype of the given value, "array", "object", "string", "boolean", "number", "integer"
const getLiteralType = (value) => {
  if (Array.isArray(value)) {
    return "array";
  } else {
    let result = typeof value;
    if (result === "number" && Number.isInteger(value)) {
      return "integer";
    }
    return result;
  }
};

const generateNodeComplianceRules = (nodeData, configData) => {
  let result = cloneJson(nodeData);
  if (!configData) {
    return result;
  }
  for (const entry of configData) {
    result = result.filter((el) => el.term !== entry.term);
    result.push(cloneJson(entry));
  }
  return result;
};

// generates a string representing a given value of any datatype to be included in the error message
const getCleanOutputString = (value) => {
  let actualValue = cloneJson(value);
  if (typeof actualValue !== "string") {
    actualValue = JSON.stringify(actualValue);
    actualValue = actualValue.replace(/"/g, "'");
  }
  return actualValue;
};

module.exports = verifyDsV7;
