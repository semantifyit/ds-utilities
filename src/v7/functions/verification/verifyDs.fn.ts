/*
 * ===========================================
 * functions for the meta verification
 * ===========================================
 */

import { DsV7 } from "../../types/DsGrammarV7.type";
import {
  VerificationConfigV7,
  VerificationReportV7,
} from "../../types/VerificationV7.type";
import { nodeSchemaDs } from "../../data/nodeSchemas/Ds.nodeSchema";
import { nodeSchemaContext } from "../../data/nodeSchemas/Context.nodeSchema";
import { VerificationReport } from "./VerificationReport";
import { ErrorEntry } from "./ErrorEntry";
import { cloneJson, isObject } from "../../../base/helper/helper";
import { getDsRootNode } from "../structure/getDsRootNode.fn";
import { dsPathInit } from "../path/dsPathInit.fn";
import { pathGrammarNodeTypes as PGN } from "../../data/pathGrammar.data";
import { DsNodeGeneric } from "../../../base/types/DsGrammarGeneric.type";
import { nodeSchemaRoot } from "../../data/nodeSchemas/Root.nodeSchema";
import { nodeSchemaClass } from "../../data/nodeSchemas/Class.nodeSchema";
import { dsPathAddition } from "../path/dsPathAddition.fn";
import { nodeSchemaEnumeration } from "../../data/nodeSchemas/Enumeration.nodeSchema";
import { nodeSchemaProperty } from "../../data/nodeSchemas/Property.nodeSchema";
import { dsPathIdentifyNodeType } from "../path/dsPathIdentifyNodeType.fn";
import { nodeSchemaDataType } from "../../data/nodeSchemas/DataType.nodeSchema";
import { NodeSchema } from "../../../base/types/NodeSchema.type";

/**
 * Verifies if the given Domain Specification complies to the [DS-V7 specification](https://gitbook.semantify.it/domainspecifications/ds-v7).
 *
 * It is possible to pass a config object to this verification, where the expected grammar of the DS can be configured. This function returns a {@link VerificationReportV7 | meta verification report}.
 *
 * @example
 * ```JS
 * const verificationReport = myDsUtilitiesV7.verifyDs(exampleDs);
 * // returns a verification report for the exampleDs
 * ```
 *
 * @param ds - the input Domain Specification
 * @param config - config object with options for the meta verification
 * @return verification report
 */
export function verifyDs(
  ds: DsV7,
  config: VerificationConfigV7 = {}
): VerificationReportV7 {
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
      mergeNodeSchemas(nodeSchemaDs, config.nodeSchemaDs)
    );
    // check compliance of the @context
    if (isObject(ds["@context"])) {
      checkCompliance(
        verificationReport,
        "@context",
        ds["@context"],
        mergeNodeSchemas(nodeSchemaContext, config.nodeSchemaContext)
      );
    }
    // check compliance of root node
    const rootNode = getDsRootNode(ds);
    verifyClassNode(
      ds,
      rootNode,
      verificationReport,
      dsPathInit(),
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
        dsPathInit(PGN.defInt, graphNode["@id"]),
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
}

function verifyClassNode(
  ds: DsV7,
  classNode: DsNodeGeneric,
  verificationReport: VerificationReport,
  path: string,
  config: VerificationConfigV7,
  isRoot: boolean
): void {
  let complianceRules;
  if (isRoot) {
    complianceRules = mergeNodeSchemas(nodeSchemaRoot, config.nodeSchemaRoot);
  } else {
    complianceRules = mergeNodeSchemas(nodeSchemaClass, config.nodeSchemaClass);
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
        dsPathAddition(path, PGN.property, pNode["sh:path"]),
        config
      );
    }
  }
}

function verifyEnumerationNode(
  ds: DsV7,
  enumerationNode: DsNodeGeneric,
  verificationReport: VerificationReport,
  path: string,
  config: VerificationConfigV7
): void {
  // check the property node itself
  checkCompliance(
    verificationReport,
    path,
    enumerationNode,
    mergeNodeSchemas(nodeSchemaEnumeration, config.nodeSchemaEnumeration)
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
}

function verifyPropertyNode(
  ds: DsV7,
  propertyNode: DsNodeGeneric,
  verificationReport: VerificationReport,
  path: string,
  config: VerificationConfigV7
): void {
  // check the property node itself
  checkCompliance(
    verificationReport,
    path,
    propertyNode,
    mergeNodeSchemas(nodeSchemaProperty, config.nodeSchemaProperty)
  );
  // recursive check of ranges
  if (Array.isArray(propertyNode["sh:or"])) {
    for (const rNode of propertyNode["sh:or"]) {
      let nodeType;
      let nodeToCheck;
      if (rNode["sh:node"]) {
        nodeType = dsPathIdentifyNodeType(rNode["sh:node"], ds);
        nodeToCheck = rNode["sh:node"];
      } else {
        nodeType = dsPathIdentifyNodeType(rNode, ds);
        nodeToCheck = rNode;
      }
      let newPath;
      switch (nodeType) {
        case PGN.class:
          try {
            newPath = dsPathAddition(path, nodeType, nodeToCheck["sh:class"]);
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
        case PGN.enumeration:
          try {
            newPath = dsPathAddition(path, nodeType, nodeToCheck["sh:class"]);
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
        case PGN.dataType:
          try {
            newPath = dsPathAddition(
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
}

function verifyDataTypeNode(
  ds: DsV7,
  dataTypeNode: DsNodeGeneric,
  verificationReport: VerificationReport,
  path: string,
  config: VerificationConfigV7
): void {
  // check the datatype node itself
  checkCompliance(
    verificationReport,
    path,
    dataTypeNode,
    mergeNodeSchemas(nodeSchemaDataType, config.nodeSchemaDataType)
  );
}

function checkCompliance(
  verificationReport: VerificationReport,
  path: string | null,
  inputObject: DsNodeGeneric,
  nodeSchema: NodeSchema
): void {
  for (const termObj of nodeSchema) {
    // check if required but not used
    if (termObj.required && inputObject[termObj.term] === undefined) {
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
    (el) => !nodeSchema.find((el2) => el2.term === el)
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
}

// returns false if the values are not the same
// at this point the inputs are known to have the same datatype
function isSameValue(val1: any, val2: any): boolean {
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
}

// returns true if both given objects have the same keys
function checkSameKeys(obj1: object, obj2: object): boolean {
  const diff1 = Object.keys(obj1).filter(
    (el) => !Object.keys(obj2).includes(el)
  );
  const diff2 = Object.keys(obj2).filter(
    (el) => !Object.keys(obj1).includes(el)
  );
  return diff1.length === 0 && diff2.length === 0;
}

type literalType =
  | "array"
  | "object"
  | "string"
  | "boolean"
  | "number"
  | "integer"
  | "undefined";

// returns the datatype of the given value, "array", "object", "string", "boolean", "number", "integer"
function getLiteralType(value: any): literalType {
  if (Array.isArray(value)) {
    return "array";
  } else {
    const result = typeof value;
    if (result === "number" && Number.isInteger(value)) {
      return "integer";
    }
    return result as literalType;
  }
}

function mergeNodeSchemas(
  nodeData: NodeSchema,
  configData?: NodeSchema
): NodeSchema {
  let result = cloneJson(nodeData);
  if (!configData) {
    return result;
  }
  for (const entry of configData) {
    result = result.filter((el) => el.term !== entry.term);
    result.push(cloneJson(entry));
  }
  return result;
}

// generates a string representing a given value of any datatype to be included in the error message
function getCleanOutputString(value: any): string {
  let actualValue = cloneJson(value);
  if (typeof actualValue !== "string") {
    actualValue = JSON.stringify(actualValue);
    actualValue = actualValue.replace(/"/g, "'");
  }
  return actualValue;
}
