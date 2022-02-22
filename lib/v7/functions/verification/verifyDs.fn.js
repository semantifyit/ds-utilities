"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDs = void 0;
const Ds_nodeSchema_1 = require("../../data/nodeSchemas/Ds.nodeSchema");
const Context_nodeSchema_1 = require("../../data/nodeSchemas/Context.nodeSchema");
const VerificationReport_1 = require("./VerificationReport");
const ErrorEntry_1 = require("./ErrorEntry");
const helper_1 = require("../../../base/helper/helper");
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const dsPathInit_fn_1 = require("../path/dsPathInit.fn");
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
const Root_nodeSchema_1 = require("../../data/nodeSchemas/Root.nodeSchema");
const Class_nodeSchema_1 = require("../../data/nodeSchemas/Class.nodeSchema");
const dsPathAddition_fn_1 = require("../path/dsPathAddition.fn");
const Enumeration_nodeSchema_1 = require("../../data/nodeSchemas/Enumeration.nodeSchema");
const Property_nodeSchema_1 = require("../../data/nodeSchemas/Property.nodeSchema");
const dsPathIdentifyNodeType_fn_1 = require("../path/dsPathIdentifyNodeType.fn");
const DataType_nodeSchema_1 = require("../../data/nodeSchemas/DataType.nodeSchema");
function verifyDs(ds, config = {}) {
    const verificationReport = new VerificationReport_1.VerificationReport();
    try {
        if (!(0, helper_1.isObject)(ds)) {
            verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", "$", "The given input was not an object, as required."));
        }
        checkCompliance(verificationReport, null, ds, mergeNodeSchemas(Ds_nodeSchema_1.nodeSchemaDs, config.nodeSchemaDs));
        if ((0, helper_1.isObject)(ds["@context"])) {
            checkCompliance(verificationReport, "@context", ds["@context"], mergeNodeSchemas(Context_nodeSchema_1.nodeSchemaContext, config.nodeSchemaContext));
        }
        const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
        verifyClassNode(ds, rootNode, verificationReport, (0, dsPathInit_fn_1.dsPathInit)(), config, true);
        for (const graphNode of ds["@graph"]) {
            if (graphNode["@id"] === rootNode["@id"]) {
                continue;
            }
            verifyClassNode(ds, graphNode, verificationReport, (0, dsPathInit_fn_1.dsPathInit)(pathGrammar_data_1.pathGrammarNodeTypes.defInt, graphNode["@id"]), config, false);
        }
        return verificationReport.toJson();
    }
    catch (e) {
        verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Critical", "$", "There was a critical error during the verification: " + e));
        return verificationReport.toJson();
    }
}
exports.verifyDs = verifyDs;
function verifyClassNode(ds, classNode, verificationReport, path, config, isRoot) {
    let complianceRules;
    if (isRoot) {
        complianceRules = mergeNodeSchemas(Root_nodeSchema_1.nodeSchemaRoot, config.nodeSchemaRoot);
    }
    else {
        complianceRules = mergeNodeSchemas(Class_nodeSchema_1.nodeSchemaClass, config.nodeSchemaClass);
    }
    checkCompliance(verificationReport, path, classNode, complianceRules);
    if (Array.isArray(classNode["sh:property"])) {
        for (const pNode of classNode["sh:property"]) {
            verifyPropertyNode(ds, pNode, verificationReport, (0, dsPathAddition_fn_1.dsPathAddition)(path, pathGrammar_data_1.pathGrammarNodeTypes.property, pNode["sh:path"]), config);
        }
    }
}
function verifyEnumerationNode(ds, enumerationNode, verificationReport, path, config) {
    checkCompliance(verificationReport, path, enumerationNode, mergeNodeSchemas(Enumeration_nodeSchema_1.nodeSchemaEnumeration, config.nodeSchemaEnumeration));
    if (Array.isArray(enumerationNode["sh:in"])) {
        for (const enumValue of enumerationNode["sh:in"]) {
            if (!(0, helper_1.isObject)(enumValue)) {
                verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "An enumeration has an unexpected entry for 'sh:in'."));
            }
            else {
                if (enumValue["@id"] === undefined) {
                    verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "An enumeration value has no '@id'."));
                }
                else if (typeof enumValue["@id"] !== "string") {
                    verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "An enumeration value has an '@id' that is not a string."));
                }
                for (const term of Object.keys(enumValue)) {
                    if (term !== "@id") {
                        verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Warning", path, "Additional term '" + term + " is being used."));
                    }
                }
            }
        }
    }
}
function verifyPropertyNode(ds, propertyNode, verificationReport, path, config) {
    checkCompliance(verificationReport, path, propertyNode, mergeNodeSchemas(Property_nodeSchema_1.nodeSchemaProperty, config.nodeSchemaProperty));
    if (Array.isArray(propertyNode["sh:or"])) {
        for (const rNode of propertyNode["sh:or"]) {
            let nodeType;
            let nodeToCheck;
            if (rNode["sh:node"]) {
                nodeType = (0, dsPathIdentifyNodeType_fn_1.dsPathIdentifyNodeType)(rNode["sh:node"], ds);
                nodeToCheck = rNode["sh:node"];
            }
            else {
                nodeType = (0, dsPathIdentifyNodeType_fn_1.dsPathIdentifyNodeType)(rNode, ds);
                nodeToCheck = rNode;
            }
            let newPath;
            switch (nodeType) {
                case pathGrammar_data_1.pathGrammarNodeTypes.class:
                    try {
                        newPath = (0, dsPathAddition_fn_1.dsPathAddition)(path, nodeType, nodeToCheck["sh:class"]);
                    }
                    catch (e) {
                        newPath = path;
                    }
                    verifyClassNode(ds, nodeToCheck, verificationReport, newPath, config, false);
                    break;
                case pathGrammar_data_1.pathGrammarNodeTypes.enumeration:
                    try {
                        newPath = (0, dsPathAddition_fn_1.dsPathAddition)(path, nodeType, nodeToCheck["sh:class"]);
                    }
                    catch (e) {
                        newPath = path;
                    }
                    verifyEnumerationNode(ds, nodeToCheck, verificationReport, newPath, config);
                    break;
                case pathGrammar_data_1.pathGrammarNodeTypes.dataType:
                    try {
                        newPath = (0, dsPathAddition_fn_1.dsPathAddition)(path, nodeType, nodeToCheck["sh:datatype"]);
                    }
                    catch (e) {
                        newPath = path;
                    }
                    verifyDataTypeNode(ds, nodeToCheck, verificationReport, newPath, config);
                    break;
            }
        }
    }
}
function verifyDataTypeNode(ds, dataTypeNode, verificationReport, path, config) {
    checkCompliance(verificationReport, path, dataTypeNode, mergeNodeSchemas(DataType_nodeSchema_1.nodeSchemaDataType, config.nodeSchemaDataType));
}
function checkCompliance(verificationReport, path, inputObject, nodeSchema) {
    for (const termObj of nodeSchema) {
        if (termObj.required && inputObject[termObj.term] === undefined) {
            verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "Term '" + termObj.term + "' is required but not used."));
            continue;
        }
        if (inputObject[termObj.term] !== undefined) {
            const valType = getLiteralType(inputObject[termObj.term]);
            if (termObj.valueType &&
                termObj.valueType !== "any" &&
                valType !== termObj.valueType) {
                verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "Term '" +
                    termObj.term +
                    "' requires a value with datatype '" +
                    termObj.valueType +
                    "', but has the datatype '" +
                    valType +
                    "'."));
                continue;
            }
            else if (valType === "array" &&
                inputObject[termObj.term].length === 0) {
                verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "Term '" + termObj.term + "' has an empty array as value."));
            }
            if (termObj.value &&
                !isSameValue(inputObject[termObj.term], termObj.value)) {
                verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "Term '" +
                    termObj.term +
                    "' requires the value '" +
                    getCleanOutputString(termObj.value) +
                    "', but has the value '" +
                    getCleanOutputString(inputObject[termObj.term]) +
                    "'."));
            }
            if (termObj.valueIn &&
                !termObj.valueIn.includes(inputObject[termObj.term])) {
                verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Error", path, "Term '" +
                    termObj.term +
                    "' must have a value from an expected set, which does not include the given value '" +
                    getCleanOutputString(inputObject[termObj.term]) +
                    "'."));
            }
        }
    }
    const additionalTerms = Object.keys(inputObject).filter((el) => !nodeSchema.find((el2) => el2.term === el));
    for (const at of additionalTerms) {
        verificationReport.addErrorEntry(new ErrorEntry_1.ErrorEntry("Warning", path, "Additional term '" + at + " is being used."));
    }
}
function isSameValue(val1, val2) {
    if ((0, helper_1.isObject)(val1)) {
        if (!checkSameKeys(val1, val2)) {
            return false;
        }
        else {
            for (const v of Object.keys(val1)) {
                if (!isSameValue(val1[v], val2[v])) {
                    return false;
                }
            }
        }
        return true;
    }
    else {
        return val1 === val2;
    }
}
function checkSameKeys(obj1, obj2) {
    const diff1 = Object.keys(obj1).filter((el) => !Object.keys(obj2).includes(el));
    const diff2 = Object.keys(obj2).filter((el) => !Object.keys(obj1).includes(el));
    return diff1.length === 0 && diff2.length === 0;
}
function getLiteralType(value) {
    if (Array.isArray(value)) {
        return "array";
    }
    else {
        let result = typeof value;
        if (result === "number" && Number.isInteger(value)) {
            return "integer";
        }
        return result;
    }
}
function mergeNodeSchemas(nodeData, configData) {
    let result = (0, helper_1.cloneJson)(nodeData);
    if (!configData) {
        return result;
    }
    for (const entry of configData) {
        result = result.filter((el) => el.term !== entry.term);
        result.push((0, helper_1.cloneJson)(entry));
    }
    return result;
}
function getCleanOutputString(value) {
    let actualValue = (0, helper_1.cloneJson)(value);
    if (typeof actualValue !== "string") {
        actualValue = JSON.stringify(actualValue);
        actualValue = actualValue.replace(/"/g, "'");
    }
    return actualValue;
}
//# sourceMappingURL=verifyDs.fn.js.map