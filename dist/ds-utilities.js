(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DsUtil = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsUtilitiesBase = void 0;
const getDsSpecificationVersion_fn_1 = require("./functions/getDsSpecificationVersion.fn");
const prettyPrintCompactedIRIs_fn_1 = require("./functions/prettyPrintCompactedIRIs.fn");
const extractSdoVersionNumber_fn_1 = require("./functions/extractSdoVersionNumber.fn");
class DsUtilitiesBase {
    constructor() {
        this.getDsSpecificationVersion = getDsSpecificationVersion_fn_1.getDsSpecificationVersion;
        this.prettyPrintCompactedIRIs = prettyPrintCompactedIRIs_fn_1.prettyPrintCompactedIRIs;
        this.extractSdoVersionNumber = extractSdoVersionNumber_fn_1.extractSdoVersionNumber;
    }
    getDsUtilitiesVersion() {
        return this.dsUtilitiesVersion;
    }
}
exports.DsUtilitiesBase = DsUtilitiesBase;

},{"./functions/extractSdoVersionNumber.fn":3,"./functions/getDsSpecificationVersion.fn":4,"./functions/prettyPrintCompactedIRIs.fn":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaLanguageTaggedString = void 0;
exports.nodeSchemaLanguageTaggedString = [
    {
        term: "@language",
        required: true,
        valueType: "string",
    },
    {
        term: "@value",
        required: true,
        valueType: "string",
    },
];

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSdoVersionNumber = void 0;
function extractSdoVersionNumber(schemaVersionValue) {
    if (schemaVersionValue.includes("schema.org/docs/")) {
        const versionRegex = /.*schema\.org\/docs\/releases\.html#v([0-9.]+)(\/)?/g;
        const match = versionRegex.exec(schemaVersionValue);
        if (match && match[1]) {
            return match[1];
        }
    }
    else if (schemaVersionValue.includes("schema.org/version/")) {
        const versionRegex = /.*schema\.org\/version\/([0-9.]+)(\/)?/g;
        const match = versionRegex.exec(schemaVersionValue);
        if (match && match[1]) {
            return match[1];
        }
    }
    throw new Error("The given url did not fit the expected format for a schema.org version url.");
}
exports.extractSdoVersionNumber = extractSdoVersionNumber;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsSpecificationVersion = void 0;
function getDsSpecificationVersion(ds) {
    if (!Array.isArray(ds["@graph"])) {
        throw new Error("The given DS has no @graph array, which is expected for any DS version.");
    }
    try {
        const rootNode = ds["@graph"].find((el) => el["@type"] === "ds:DomainSpecification");
        if (rootNode) {
            return rootNode["ds:version"];
        }
    }
    catch (e) {
    }
    try {
        const rootNode = ds["@graph"].find((el) => Array.isArray(el["@type"]) &&
            el["@type"].includes("sh:NodeShape") &&
            el["@type"].includes("schema:CreativeWork"));
        if (rootNode) {
            return "5.0";
        }
    }
    catch (e) {
    }
    throw new Error("The DS specification version for the given DS could not been determined - the DS has an unexpected structure.");
}
exports.getDsSpecificationVersion = getDsSpecificationVersion;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrintCompactedIRIs = void 0;
function prettyPrintCompactedIRIs(compactedIRIs) {
    if (Array.isArray(compactedIRIs)) {
        return compactedIRIs.map(prettyPrintCompactedIRIs).join(" + ");
    }
    else {
        if (compactedIRIs.startsWith("schema:")) {
            return compactedIRIs.substring("schema:".length);
        }
        return compactedIRIs;
    }
}
exports.prettyPrintCompactedIRIs = prettyPrintCompactedIRIs;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.deepEqual = exports.reorderNodeWithSchema = exports.getLanguageString = exports.cloneJson = void 0;
function cloneJson(input) {
    if (input === undefined) {
        return input;
    }
    return JSON.parse(JSON.stringify(input));
}
exports.cloneJson = cloneJson;
function getLanguageString(valuesArray, language) {
    if (!Array.isArray(valuesArray)) {
        throw new Error("Given valuesArray parameter is not an array, as expected");
    }
    if (language) {
        const entryForGivenLanguage = valuesArray.find((el) => el["@language"] === language);
        if (entryForGivenLanguage && entryForGivenLanguage["@value"]) {
            return entryForGivenLanguage["@value"];
        }
    }
    else {
        if (valuesArray[0] && valuesArray[0]["@value"]) {
            return valuesArray[0]["@value"];
        }
    }
    return undefined;
}
exports.getLanguageString = getLanguageString;
function reorderNodeWithSchema(dsNode, nodeSchema) {
    const dsNodeCopy = cloneJson(dsNode);
    for (const p of Object.keys(dsNode)) {
        delete dsNode[p];
    }
    for (const t of nodeSchema) {
        const term = t.term;
        if (dsNodeCopy[term] !== undefined) {
            dsNode[term] = dsNodeCopy[term];
        }
    }
    for (const p of Object.keys(dsNodeCopy)) {
        const standardTerm = nodeSchema.find((el) => el.term === p);
        if (standardTerm === undefined) {
            dsNode[p] = dsNodeCopy[p];
        }
    }
}
exports.reorderNodeWithSchema = reorderNodeWithSchema;
function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if ((areObjects && !deepEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)) {
            return false;
        }
    }
    return true;
}
exports.deepEqual = deepEqual;
function isObject(val) {
    return val instanceof Object && !(val instanceof Array);
}
exports.isObject = isObject;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsUtilitiesForDs = exports.getDsUtilitiesForDsSpecVersion = exports.availableVersions = void 0;
const DsUtilitiesV7_1 = require("./v7/DsUtilitiesV7");
const getDsSpecificationVersion_fn_1 = require("./base/functions/getDsSpecificationVersion.fn");
const DsUtilitiesV5_1 = require("./v5/DsUtilitiesV5");
const availableVersions = {
    "7.0": DsUtilitiesV7_1.DsUtilitiesV7,
    "5.0": DsUtilitiesV5_1.DsUtilitiesV5,
};
exports.availableVersions = availableVersions;
function getDsUtilitiesForDsSpecVersion(dsSpecVersion) {
    if (!Object.keys(availableVersions).includes(dsSpecVersion)) {
        throw new Error("The given DS Specification Version " +
            dsSpecVersion +
            " is unknown to DsUtilities.");
    }
    return new availableVersions[dsSpecVersion]();
}
exports.getDsUtilitiesForDsSpecVersion = getDsUtilitiesForDsSpecVersion;
function getDsUtilitiesForDs(ds) {
    const dsVersion = (0, getDsSpecificationVersion_fn_1.getDsSpecificationVersion)(ds);
    return getDsUtilitiesForDsSpecVersion(dsVersion);
}
exports.getDsUtilitiesForDs = getDsUtilitiesForDs;

},{"./base/functions/getDsSpecificationVersion.fn":4,"./v5/DsUtilitiesV5":8,"./v7/DsUtilitiesV7":23}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsUtilitiesV5 = void 0;
const DsUtilitiesBase_1 = require("../base/DsUtilitiesBase");
const getDsRootNode_fn_1 = require("./functions/structure/getDsRootNode.fn");
const getDsStandardContext_fn_1 = require("./functions/structure/getDsStandardContext.fn");
const getDsId_fn_1 = require("./functions/structure/getDsId.fn");
const getDsDataTypeForSchemaDataType_fn_1 = require("./functions/structure/getDsDataTypeForSchemaDataType.fn");
const getSchemaDataTypeForDsDataType_fn_1 = require("./functions/structure/getSchemaDataTypeForDsDataType.fn");
const getDsDescription_fn_1 = require("./functions/ui/getDsDescription.fn");
const getDsName_fn_1 = require("./functions/ui/getDsName.fn");
const getDsAuthorName_fn_1 = require("./functions/ui/getDsAuthorName.fn");
const getDsSchemaVersion_fn_1 = require("./functions/ui/getDsSchemaVersion.fn");
const getDsVersion_fn_1 = require("./functions/ui/getDsVersion.fn");
const getDsExternalVocabularies_fn_1 = require("./functions/ui/getDsExternalVocabularies.fn");
const getDsTargetClasses_fn_1 = require("./functions/ui/getDsTargetClasses.fn");
class DsUtilitiesV5 extends DsUtilitiesBase_1.DsUtilitiesBase {
    constructor() {
        super();
        this.dsUtilitiesVersion = "5.0";
        this.getDsRootNode = getDsRootNode_fn_1.getDsRootNode;
        this.getDsStandardContext = getDsStandardContext_fn_1.getDsStandardContext;
        this.getDsId = getDsId_fn_1.getDsId;
        this.getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType_fn_1.getDsDataTypeForSchemaDataType;
        this.getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType_fn_1.getSchemaDataTypeForDsDataType;
        this.getDsName = getDsName_fn_1.getDsName;
        this.getDsDescription = getDsDescription_fn_1.getDsDescription;
        this.getDsAuthorName = getDsAuthorName_fn_1.getDsAuthorName;
        this.getDsSchemaVersion = getDsSchemaVersion_fn_1.getDsSchemaVersion;
        this.getDsVersion = getDsVersion_fn_1.getDsVersion;
        this.getDsExternalVocabularies = getDsExternalVocabularies_fn_1.getDsExternalVocabularies;
        this.getDsTargetClasses = getDsTargetClasses_fn_1.getDsTargetClasses;
    }
}
exports.DsUtilitiesV5 = DsUtilitiesV5;

},{"../base/DsUtilitiesBase":1,"./functions/structure/getDsDataTypeForSchemaDataType.fn":11,"./functions/structure/getDsId.fn":12,"./functions/structure/getDsRootNode.fn":13,"./functions/structure/getDsStandardContext.fn":14,"./functions/structure/getSchemaDataTypeForDsDataType.fn":15,"./functions/ui/getDsAuthorName.fn":16,"./functions/ui/getDsDescription.fn":17,"./functions/ui/getDsExternalVocabularies.fn":18,"./functions/ui/getDsName.fn":19,"./functions/ui/getDsSchemaVersion.fn":20,"./functions/ui/getDsTargetClasses.fn":21,"./functions/ui/getDsVersion.fn":22}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTypeMappingToLabel = exports.dataTypeMapping = exports.dataTypesDs = exports.dataTypesSchema = void 0;
exports.dataTypesSchema = {
    text: "schema:Text",
    url: "schema:URL",
    number: "schema:Number",
    integer: "schema:Integer",
    float: "schema:Float",
    boolean: "schema:Boolean",
    time: "schema:Time",
    date: "schema:Date",
    dateTime: "schema:DateTime",
};
exports.dataTypesDs = {
    string: "xsd:string",
    url: "xsd:anyURI",
    double: "xsd:double",
    integer: "xsd:integer",
    float: "xsd:float",
    boolean: "xsd:boolean",
    time: "xsd:time",
    date: "xsd:date",
    dateTime: "xsd:dateTime",
};
exports.dataTypeMapping = {
    [exports.dataTypesDs.string]: exports.dataTypesSchema.text,
    [exports.dataTypesDs.boolean]: exports.dataTypesSchema.boolean,
    [exports.dataTypesDs.date]: exports.dataTypesSchema.date,
    [exports.dataTypesDs.dateTime]: exports.dataTypesSchema.dateTime,
    [exports.dataTypesDs.time]: exports.dataTypesSchema.time,
    [exports.dataTypesDs.double]: exports.dataTypesSchema.number,
    [exports.dataTypesDs.integer]: exports.dataTypesSchema.integer,
    [exports.dataTypesDs.float]: exports.dataTypesSchema.float,
    [exports.dataTypesDs.url]: exports.dataTypesSchema.url,
};
exports.dataTypeMappingToLabel = {
    [exports.dataTypesDs.string]: "Text",
    [exports.dataTypesDs.boolean]: "Boolean",
    [exports.dataTypesDs.date]: "Date",
    [exports.dataTypesDs.dateTime]: "DateTime",
    [exports.dataTypesDs.time]: "Time",
    [exports.dataTypesDs.double]: "Number",
    [exports.dataTypesDs.integer]: "Integer",
    [exports.dataTypesDs.float]: "Float",
    [exports.dataTypesDs.url]: "URL",
};

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardContext = void 0;
exports.standardContext = {
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    sh: "http://www.w3.org/ns/shacl#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    schema: "http://schema.org/",
    "sh:targetClass": {
        "@id": "sh:targetClass",
        "@type": "@id",
    },
    "sh:property": {
        "@id": "sh:property",
    },
    "sh:path": {
        "@id": "sh:path",
        "@type": "@id",
    },
    "sh:datatype": {
        "@id": "sh:datatype",
        "@type": "@id",
    },
    "sh:node": {
        "@id": "sh:node",
    },
    "sh:class": {
        "@id": "sh:class",
        "@type": "@id",
    },
    "sh:or": {
        "@id": "sh:or",
        "@container": "@list",
    },
    "sh:in": {
        "@id": "sh:in",
        "@container": "@list",
    },
    "sh:languageIn": {
        "@id": "sh:languageIn",
        "@container": "@list",
    },
    "sh:equals": {
        "@id": "sh:equals",
        "@type": "@id",
    },
    "sh:disjoint": {
        "@id": "sh:disjoint",
        "@type": "@id",
    },
    "sh:lessThan": {
        "@id": "sh:lessThan",
        "@type": "@id",
    },
    "sh:lessThanOrEquals": {
        "@id": "sh:lessThanOrEquals",
        "@type": "@id",
    },
    ds: "http://vocab.sti2.at/ds/",
    "ds:usedVocabularies": {
        "@id": "ds:usedVocabularies",
        "@type": "@id",
    },
};

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDataTypeForSchemaDataType = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getDsDataTypeForSchemaDataType(schemaDataType) {
    const match = Object.keys(datatypes_data_1.dataTypeMapping).find((el) => {
        return datatypes_data_1.dataTypeMapping[el] === schemaDataType;
    });
    if (!match) {
        throw new Error("Given input '" +
            schemaDataType +
            "' is not a valid schema.org datatype in DS-V5.");
    }
    return match;
}
exports.getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;

},{"../../data/datatypes.data":9}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsId = void 0;
function getDsId(ds) {
    if (!ds["@id"]) {
        throw new Error("The given DS has no @id, which is mandatory for a DS in DS-V5 format.");
    }
    return ds["@id"];
}
exports.getDsId = getDsId;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsRootNode = void 0;
function getDsRootNode(ds) {
    if (!ds["@graph"]) {
        throw new Error("The given DS has no @graph array, which is mandatory for a DS in DS-V5 format.");
    }
    const rootNode = ds["@graph"].find((el) => Array.isArray(el["@type"]) &&
        el["@type"].includes("sh:NodeShape") &&
        el["@type"].includes("schema:CreativeWork"));
    if (!rootNode) {
        throw new Error("The given DS has no identifiable root node in DS-V5 format.");
    }
    return rootNode;
}
exports.getDsRootNode = getDsRootNode;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsStandardContext = void 0;
const standardContext_data_1 = require("../../data/standardContext.data");
const helper_1 = require("../../../base/helper/helper");
function getDsStandardContext() {
    return (0, helper_1.cloneJson)(standardContext_data_1.standardContext);
}
exports.getDsStandardContext = getDsStandardContext;

},{"../../../base/helper/helper":6,"../../data/standardContext.data":10}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaDataTypeForDsDataType = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getSchemaDataTypeForDsDataType(dsDataType) {
    const match = datatypes_data_1.dataTypeMapping[dsDataType];
    if (!match) {
        throw new Error("Given input '" +
            dsDataType +
            "' is not a valid xsd/rdf datatype in DS-V5.");
    }
    return match;
}
exports.getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;

},{"../../data/datatypes.data":9}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsAuthorName = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsAuthorName(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
        return rootNode["schema:author"]["schema:name"];
    }
    return undefined;
}
exports.getDsAuthorName = getDsAuthorName;

},{"../structure/getDsRootNode.fn":13}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDescription = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsDescription(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    return rootNode["schema:description"];
}
exports.getDsDescription = getDsDescription;

},{"../structure/getDsRootNode.fn":13}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsExternalVocabularies = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsExternalVocabularies(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["ds:usedVocabularies"]) {
        return (0, helper_1.cloneJson)(rootNode["ds:usedVocabularies"]);
    }
    return [];
}
exports.getDsExternalVocabularies = getDsExternalVocabularies;

},{"../../../base/helper/helper":6,"../structure/getDsRootNode.fn":13}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsName = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsName(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    return rootNode["schema:name"];
}
exports.getDsName = getDsName;

},{"../structure/getDsRootNode.fn":13}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsSchemaVersion = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const extractSdoVersionNumber_fn_1 = require("../../../base/functions/extractSdoVersionNumber.fn");
function getDsSchemaVersion(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["schema:schemaVersion"]) {
        throw new Error("The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format.");
    }
    return (0, extractSdoVersionNumber_fn_1.extractSdoVersionNumber)(rootNode["schema:schemaVersion"]);
}
exports.getDsSchemaVersion = getDsSchemaVersion;

},{"../../../base/functions/extractSdoVersionNumber.fn":3,"../structure/getDsRootNode.fn":13}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsTargetClasses = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsTargetClasses(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["sh:targetClass"]) {
        throw new Error("The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format.");
    }
    if (!Array.isArray(rootNode["sh:targetClass"])) {
        return (0, helper_1.cloneJson)([rootNode["sh:targetClass"]]);
    }
    return (0, helper_1.cloneJson)(rootNode["sh:targetClass"]);
}
exports.getDsTargetClasses = getDsTargetClasses;

},{"../../../base/helper/helper":6,"../structure/getDsRootNode.fn":13}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsVersion = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsVersion(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    return rootNode["schema:version"];
}
exports.getDsVersion = getDsVersion;

},{"../structure/getDsRootNode.fn":13}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsUtilitiesV7 = void 0;
const DsUtilitiesBase_1 = require("../base/DsUtilitiesBase");
const getDsId_fn_1 = require("./functions/structure/getDsId.fn");
const getDsName_fn_1 = require("./functions/ui/getDsName.fn");
const getDsRootNode_fn_1 = require("./functions/structure/getDsRootNode.fn");
const getDsStandardContext_fn_1 = require("./functions/structure/getDsStandardContext.fn");
const getDsDescription_fn_1 = require("./functions/ui/getDsDescription.fn");
const getDsAuthorName_fn_1 = require("./functions/ui/getDsAuthorName.fn");
const getDsSchemaVersion_fn_1 = require("./functions/ui/getDsSchemaVersion.fn");
const getDsVersion_fn_1 = require("./functions/ui/getDsVersion.fn");
const getDsExternalVocabularies_fn_1 = require("./functions/ui/getDsExternalVocabularies.fn");
const getDsTargetClasses_fn_1 = require("./functions/ui/getDsTargetClasses.fn");
const generateInnerNodeId_fn_1 = require("./functions/structure/generateInnerNodeId.fn");
const reorderDsNode_fn_1 = require("./functions/structure/reorderDsNode.fn");
const identifyDsGrammarNodeType_fn_1 = require("./functions/structure/identifyDsGrammarNodeType.fn");
const dsPathGetNode_fn_1 = require("./functions/path/dsPathGetNode.fn");
const reorderDs_fn_1 = require("./functions/structure/reorderDs.fn");
const getDataTypeLabel_fn_1 = require("./functions/ui/getDataTypeLabel.fn");
const getDsDataTypeForSchemaDataType_fn_1 = require("./functions/structure/getDsDataTypeForSchemaDataType.fn");
const getSchemaDataTypeForDsDataType_fn_1 = require("./functions/structure/getSchemaDataTypeForDsDataType.fn");
const dsPathInit_fn_1 = require("./functions/path/dsPathInit.fn");
const dsPathAddition_fn_1 = require("./functions/path/dsPathAddition.fn");
const dsPathIdentifyNodeType_fn_1 = require("./functions/path/dsPathIdentifyNodeType.fn");
const tokenizeDsPath_fn_1 = require("./functions/path/tokenizeDsPath.fn");
const verifyDs_fn_1 = require("./functions/verification/verifyDs.fn");
const checkClassMatch_fn_1 = require("./functions/verification/checkClassMatch.fn");
class DsUtilitiesV7 extends DsUtilitiesBase_1.DsUtilitiesBase {
    constructor() {
        super();
        this.dsUtilitiesVersion = "7.0";
        this.getDsRootNode = getDsRootNode_fn_1.getDsRootNode;
        this.getDsStandardContext = getDsStandardContext_fn_1.getDsStandardContext;
        this.getDsId = getDsId_fn_1.getDsId;
        this.reorderDs = reorderDs_fn_1.reorderDs;
        this.reorderDsNode = reorderDsNode_fn_1.reorderDsNode;
        this.generateInnerNodeId = generateInnerNodeId_fn_1.generateInnerNodeId;
        this.getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType_fn_1.getDsDataTypeForSchemaDataType;
        this.getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType_fn_1.getSchemaDataTypeForDsDataType;
        this.identifyDsGrammarNodeType = identifyDsGrammarNodeType_fn_1.identifyDsGrammarNodeType;
        this.dsPathInit = dsPathInit_fn_1.dsPathInit;
        this.dsPathAddition = dsPathAddition_fn_1.dsPathAddition;
        this.dsPathGetNode = dsPathGetNode_fn_1.dsPathGetNode;
        this.dsPathIdentifyNodeType = dsPathIdentifyNodeType_fn_1.dsPathIdentifyNodeType;
        this.tokenizeDsPath = tokenizeDsPath_fn_1.tokenizeDsPath;
        this.getDsName = getDsName_fn_1.getDsName;
        this.getDsDescription = getDsDescription_fn_1.getDsDescription;
        this.getDsAuthorName = getDsAuthorName_fn_1.getDsAuthorName;
        this.getDsSchemaVersion = getDsSchemaVersion_fn_1.getDsSchemaVersion;
        this.getDsVersion = getDsVersion_fn_1.getDsVersion;
        this.getDsExternalVocabularies = getDsExternalVocabularies_fn_1.getDsExternalVocabularies;
        this.getDsTargetClasses = getDsTargetClasses_fn_1.getDsTargetClasses;
        this.getDataTypeLabel = getDataTypeLabel_fn_1.getDataTypeLabel;
        this.verifyDs = verifyDs_fn_1.verifyDs;
        this.checkClassMatch = checkClassMatch_fn_1.checkClassMatch;
    }
}
exports.DsUtilitiesV7 = DsUtilitiesV7;

},{"../base/DsUtilitiesBase":1,"./functions/path/dsPathAddition.fn":36,"./functions/path/dsPathGetNode.fn":37,"./functions/path/dsPathIdentifyNodeType.fn":38,"./functions/path/dsPathInit.fn":39,"./functions/path/tokenizeDsPath.fn":40,"./functions/structure/generateInnerNodeId.fn":41,"./functions/structure/getDsDataTypeForSchemaDataType.fn":42,"./functions/structure/getDsId.fn":43,"./functions/structure/getDsRootNode.fn":44,"./functions/structure/getDsStandardContext.fn":45,"./functions/structure/getSchemaDataTypeForDsDataType.fn":46,"./functions/structure/identifyDsGrammarNodeType.fn":47,"./functions/structure/reorderDs.fn":48,"./functions/structure/reorderDsNode.fn":49,"./functions/ui/getDataTypeLabel.fn":50,"./functions/ui/getDsAuthorName.fn":51,"./functions/ui/getDsDescription.fn":52,"./functions/ui/getDsExternalVocabularies.fn":53,"./functions/ui/getDsName.fn":54,"./functions/ui/getDsSchemaVersion.fn":55,"./functions/ui/getDsTargetClasses.fn":56,"./functions/ui/getDsVersion.fn":57,"./functions/verification/checkClassMatch.fn":60,"./functions/verification/verifyDs.fn":61}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTypeMappingToLabel = exports.dataTypeMapping = exports.dataTypesDs = exports.dataTypesSchema = void 0;
exports.dataTypesSchema = {
    text: "schema:Text",
    url: "schema:URL",
    number: "schema:Number",
    integer: "schema:Integer",
    float: "schema:Float",
    boolean: "schema:Boolean",
    time: "schema:Time",
    date: "schema:Date",
    dateTime: "schema:DateTime",
};
exports.dataTypesDs = {
    string: "xsd:string",
    langString: "rdf:langString",
    url: "xsd:anyURI",
    html: "rdf:HTML",
    double: "xsd:double",
    integer: "xsd:integer",
    float: "xsd:float",
    boolean: "xsd:boolean",
    time: "xsd:time",
    date: "xsd:date",
    dateTime: "xsd:dateTime",
};
exports.dataTypeMapping = {
    [exports.dataTypesDs.string]: exports.dataTypesSchema.text,
    [exports.dataTypesDs.langString]: exports.dataTypesSchema.text,
    [exports.dataTypesDs.html]: exports.dataTypesSchema.text,
    [exports.dataTypesDs.boolean]: exports.dataTypesSchema.boolean,
    [exports.dataTypesDs.date]: exports.dataTypesSchema.date,
    [exports.dataTypesDs.dateTime]: exports.dataTypesSchema.dateTime,
    [exports.dataTypesDs.time]: exports.dataTypesSchema.time,
    [exports.dataTypesDs.double]: exports.dataTypesSchema.number,
    [exports.dataTypesDs.integer]: exports.dataTypesSchema.integer,
    [exports.dataTypesDs.float]: exports.dataTypesSchema.float,
    [exports.dataTypesDs.url]: exports.dataTypesSchema.url,
};
exports.dataTypeMappingToLabel = {
    [exports.dataTypesDs.string]: "Text",
    [exports.dataTypesDs.langString]: "Localized Text",
    [exports.dataTypesDs.html]: "HTML Text",
    [exports.dataTypesDs.boolean]: "Boolean",
    [exports.dataTypesDs.date]: "Date",
    [exports.dataTypesDs.dateTime]: "DateTime",
    [exports.dataTypesDs.time]: "Time",
    [exports.dataTypesDs.double]: "Number",
    [exports.dataTypesDs.integer]: "Integer",
    [exports.dataTypesDs.float]: "Float",
    [exports.dataTypesDs.url]: "URL",
};

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsGrammarNodeTypes = void 0;
const dsGrammarNodeTypeDs = "DomainSpecification";
const dsGrammarNodeTypeContext = "Context";
const dsGrammarNodeTypeRoot = "RootNode";
const dsGrammarNodeTypeClassStandard = "StandardClass";
const dsGrammarNodeTypeClassRestricted = "RestrictedClass";
const dsGrammarNodeTypeEnumerationStandard = "StandardEnumeration";
const dsGrammarNodeTypeEnumerationRestricted = "RestrictedEnumeration";
const dsGrammarNodeTypeProperty = "Property";
const dsGrammarNodeTypeDataType = "DataType";
const dsGrammarNodeTypeEnumerationMember = "EnumerationMember";
const dsGrammarNodeTypeReferenceRoot = "RootReference";
const dsGrammarNodeTypeReferenceInternal = "InternalReference";
const dsGrammarNodeTypeReferenceExternal = "ExternalReference";
const dsGrammarNodeTypeReferenceInternalExternal = "InternalExternalReference";
exports.dsGrammarNodeTypes = {
    ds: dsGrammarNodeTypeDs,
    context: dsGrammarNodeTypeContext,
    root: dsGrammarNodeTypeRoot,
    classStandard: dsGrammarNodeTypeClassStandard,
    classRestricted: dsGrammarNodeTypeClassRestricted,
    enumerationStandard: dsGrammarNodeTypeEnumerationStandard,
    enumerationRestricted: dsGrammarNodeTypeEnumerationRestricted,
    property: dsGrammarNodeTypeProperty,
    dataType: dsGrammarNodeTypeDataType,
    enumerationMember: dsGrammarNodeTypeEnumerationMember,
    refRoot: dsGrammarNodeTypeReferenceRoot,
    refInternal: dsGrammarNodeTypeReferenceInternal,
    refExternal: dsGrammarNodeTypeReferenceExternal,
    refInternalExternal: dsGrammarNodeTypeReferenceInternalExternal,
};

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaClass = void 0;
exports.nodeSchemaClass = [
    {
        term: "@id",
        required: true,
        valueType: "string",
    },
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "sh:NodeShape",
    },
    {
        term: "sh:class",
        required: true,
        valueType: "array",
    },
    {
        term: "rdfs:label",
        required: false,
        valueType: "array",
    },
    {
        term: "rdfs:comment",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:closed",
        required: false,
        valueType: "boolean",
    },
    {
        term: "ds:propertyDisplayOrder",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:property",
        required: false,
        valueType: "array",
    },
];

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaContext = void 0;
const standardContext_data_1 = require("../standardContext.data");
exports.nodeSchemaContext = constructContextSchema();
function constructContextSchema() {
    const result = [];
    for (const t of Object.keys(standardContext_data_1.standardContext)) {
        const entry = {
            term: t,
            required: true,
            valueType: "string",
        };
        if (typeof standardContext_data_1.standardContext[t] !== "string") {
            entry.valueType = "object";
        }
        entry.value = standardContext_data_1.standardContext[t];
        result.push(entry);
    }
    return result;
}

},{"../standardContext.data":35}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaDataType = void 0;
exports.nodeSchemaDataType = [
    {
        term: "sh:datatype",
        required: true,
        valueType: "string",
        valueIn: [
            "xsd:string",
            "rdf:langString",
            "rdf:HTML",
            "xsd:boolean",
            "xsd:date",
            "xsd:dateTime",
            "xsd:time",
            "xsd:double",
            "xsd:integer",
            "xsd:float",
            "xsd:anyURI",
        ],
    },
    {
        term: "rdfs:label",
        required: false,
        valueType: "array",
    },
    {
        term: "rdfs:comment",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:defaultValue",
        required: false,
        valueType: "any",
    },
    {
        term: "ds:defaultLanguage",
        required: false,
        valueType: "string",
    },
    {
        term: "sh:minExclusive",
        required: false,
        valueType: "any",
    },
    {
        term: "sh:minInclusive",
        required: false,
        valueType: "any",
    },
    {
        term: "sh:maxExclusive",
        required: false,
        valueType: "any",
    },
    {
        term: "sh:maxInclusive",
        required: false,
        valueType: "any",
    },
    {
        term: "sh:minLength",
        required: false,
        valueType: "integer",
    },
    {
        term: "sh:maxLength",
        required: false,
        valueType: "integer",
    },
    {
        term: "sh:pattern",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:flag",
        required: false,
        valueType: "string",
    },
    {
        term: "sh:languageIn",
        required: false,
        valueType: "array",
    },
    {
        term: "ds:hasLanguage",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:uniqueLang",
        required: false,
        valueType: "boolean",
    },
    {
        term: "sh:in",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:hasValue",
        required: false,
        valueType: "array",
    },
];

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaDs = void 0;
exports.nodeSchemaDs = [
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

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaEnumeration = void 0;
exports.nodeSchemaEnumeration = [
    {
        term: "@id",
        required: true,
        valueType: "string",
    },
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "sh:NodeShape",
    },
    {
        term: "sh:class",
        required: true,
        valueType: "array",
    },
    {
        term: "rdfs:label",
        required: false,
        valueType: "array",
    },
    {
        term: "rdfs:comment",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:in",
        required: false,
        valueType: "array",
    },
];

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaEnumerationMember = void 0;
exports.nodeSchemaEnumerationMember = [
    {
        term: "@id",
        required: true,
        valueType: "string",
    },
    {
        term: "rdfs:label",
        required: false,
        valueType: "array",
    },
    {
        term: "rdfs:comment",
        required: false,
        valueType: "array",
    },
];

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaProperty = void 0;
exports.nodeSchemaProperty = [
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "sh:PropertyShape",
    },
    {
        term: "sh:order",
        required: false,
        valueType: "integer",
    },
    {
        term: "sh:path",
        required: true,
        valueType: "string",
    },
    {
        term: "rdfs:label",
        required: false,
        valueType: "array",
    },
    {
        term: "rdfs:comment",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:minCount",
        required: false,
        valueType: "integer",
    },
    {
        term: "sh:maxCount",
        required: false,
        valueType: "integer",
    },
    {
        term: "sh:equals",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:disjoint",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:lessThan",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:lessThanOrEquals",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:or",
        required: true,
        valueType: "array",
    },
];

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchemaRoot = void 0;
exports.nodeSchemaRoot = [
    {
        term: "@id",
        required: true,
        valueType: "string",
    },
    {
        term: "@type",
        required: true,
        valueType: "string",
        value: "ds:DomainSpecification",
    },
    {
        term: "ds:subDSOf",
        required: false,
        valueType: "string",
    },
    {
        term: "sh:targetClass",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:targetObjectsOf",
        required: false,
        valueType: "string",
    },
    {
        term: "sh:targetSubjectsOf",
        required: false,
        valueType: "string",
    },
    {
        term: "sh:class",
        required: false,
        valueType: "array",
    },
    {
        term: "schema:name",
        required: false,
        valueType: "array",
    },
    {
        term: "schema:description",
        required: false,
        valueType: "array",
    },
    {
        term: "schema:author",
        required: false,
        valueType: "object",
    },
    {
        term: "ds:version",
        required: true,
        valueType: "string",
    },
    {
        term: "schema:version",
        required: false,
        valueType: "string",
    },
    {
        term: "schema:schemaVersion",
        required: true,
        valueType: "string",
    },
    {
        term: "ds:usedVocabulary",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:closed",
        required: false,
        valueType: "boolean",
    },
    {
        term: "ds:propertyDisplayOrder",
        required: false,
        valueType: "array",
    },
    {
        term: "sh:property",
        required: true,
        valueType: "array",
    },
];

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathGrammarNodeTypes = exports.pathGrammarNodeTypeDataType = exports.pathGrammarNodeTypeEnumeration = exports.pathGrammarNodeTypeClass = exports.pathGrammarNodeTypeProperty = exports.pathGrammarNodeTypeReferenceInternalExternal = exports.pathGrammarNodeTypeReferenceExternal = exports.pathGrammarNodeTypeReferenceInternal = exports.pathGrammarNodeTypeReferenceRoot = exports.pathGrammarNodeTypeDefinitionInternalExternal = exports.pathGrammarNodeTypeDefinitionExternal = exports.pathGrammarNodeTypeDefinitionInternal = exports.pathGrammarNodeTypeRoot = exports.pathGrammarNodeTypeContext = void 0;
exports.pathGrammarNodeTypeContext = "Context";
exports.pathGrammarNodeTypeRoot = "RootNode";
exports.pathGrammarNodeTypeDefinitionInternal = "InternalReferenceDefinition";
exports.pathGrammarNodeTypeDefinitionExternal = "ExternalReferenceDefinition";
exports.pathGrammarNodeTypeDefinitionInternalExternal = "InternalExternalReferenceDefinition";
exports.pathGrammarNodeTypeReferenceRoot = "RootReference";
exports.pathGrammarNodeTypeReferenceInternal = "InternalReference";
exports.pathGrammarNodeTypeReferenceExternal = "ExternalReference";
exports.pathGrammarNodeTypeReferenceInternalExternal = "InternalExternalReference";
exports.pathGrammarNodeTypeProperty = "Property";
exports.pathGrammarNodeTypeClass = "Class";
exports.pathGrammarNodeTypeEnumeration = "Enumeration";
exports.pathGrammarNodeTypeDataType = "DataType";
exports.pathGrammarNodeTypes = {
    context: exports.pathGrammarNodeTypeContext,
    root: exports.pathGrammarNodeTypeRoot,
    defInt: exports.pathGrammarNodeTypeDefinitionInternal,
    defExt: exports.pathGrammarNodeTypeDefinitionExternal,
    defIntExt: exports.pathGrammarNodeTypeDefinitionInternalExternal,
    refRoot: exports.pathGrammarNodeTypeReferenceRoot,
    refInt: exports.pathGrammarNodeTypeReferenceInternal,
    refExt: exports.pathGrammarNodeTypeReferenceExternal,
    refIntExt: exports.pathGrammarNodeTypeReferenceInternalExternal,
    property: exports.pathGrammarNodeTypeProperty,
    class: exports.pathGrammarNodeTypeClass,
    enumeration: exports.pathGrammarNodeTypeEnumeration,
    dataType: exports.pathGrammarNodeTypeDataType,
};

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardContext = void 0;
exports.standardContext = {
    ds: "https://vocab.sti2.at/ds/",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    schema: "https://schema.org/",
    sh: "http://www.w3.org/ns/shacl#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    "ds:propertyDisplayOrder": {
        "@container": "@list",
        "@type": "@id",
    },
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

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathAddition = void 0;
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
function dsPathAddition(dsPath, additionType, inputForPath) {
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.property) {
        return dsPath + "." + inputForPath;
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.dataType) {
        return dsPath + "/" + inputForPath;
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.class || additionType === pathGrammar_data_1.pathGrammarNodeTypes.enumeration) {
        return dsPath + "/" + inputForPath.join(",");
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refRoot) {
        return dsPath + "/@$";
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refInt) {
        return dsPath + "/@#" + inputForPath.split("#")[1];
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refExt) {
        return dsPath + "/@" + inputForPath.split("/").pop();
    }
    if (additionType === pathGrammar_data_1.pathGrammarNodeTypes.refIntExt) {
        return dsPath + "/@" + inputForPath.split("/").pop();
    }
    throw new Error("Given additionType '" +
        additionType +
        "' unknown to function dsPathAddition().");
}
exports.dsPathAddition = dsPathAddition;

},{"../../data/pathGrammar.data":34}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathGetNode = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function dsPathGetNode(ds, dsPath, resolveReference = false) {
    if (dsPath === "@context") {
        if (!ds["@context"]) {
            throw new Error("The given DS has no @context, which is mandatory for a DS in DS-V7 format.");
        }
        return ds["@context"];
    }
    else if (dsPath.startsWith("$")) {
        const dsRoot = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
        if (dsPath === "$") {
            return dsRoot;
        }
        else {
            return getPropertyNode(dsRoot["sh:property"], dsPath.substring(2), ds, resolveReference);
        }
    }
    else {
        const pathTokens = dsPath.split(".");
        const referenceDefinition = ds["@graph"].find((el) => el["@id"].endsWith(pathTokens[0]));
        if (!referenceDefinition) {
            throw new Error("Could not find a fitting reference definition for path-token " +
                pathTokens[0]);
        }
        if (pathTokens.length === 1) {
            return referenceDefinition;
        }
        else {
            return getPropertyNode(referenceDefinition["sh:property"], dsPath.substring(pathTokens[0].length + 1), ds, resolveReference);
        }
    }
}
exports.dsPathGetNode = dsPathGetNode;
function checkClassMatch(arr1, arr2) {
    return (!arr1.find((el) => !arr2.includes(el)) &&
        !arr2.find((el) => !arr1.includes(el)));
}
function getRangeNode(actDsObj, actRestPath, ds, resolveReference) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    const pathTokens = actRestPath.split(".");
    const rangeToken = pathTokens[0];
    let actRange;
    let referencedNode;
    if (rangeToken.startsWith("@")) {
        if (rangeToken === "@$") {
            actRange = actDsObj.find((el) => el["sh:node"] && el["sh:node"]["@id"] === rootNode["@id"]);
            referencedNode = rootNode;
        }
        else if (rangeToken.startsWith("@#")) {
            actRange = actDsObj.find((el) => el["sh:node"] &&
                el["sh:node"]["@id"] === rootNode["@id"] + rangeToken.substring(1));
            if (actRange) {
                referencedNode = ds["@graph"].find((el) => el["@id"] ===
                    (actRange === null || actRange === void 0 ? void 0 : actRange["sh:node"]["@id"]));
            }
        }
        else {
            actRange = actDsObj.find((el) => el["sh:node"] &&
                el["sh:node"]["@id"].endsWith(rangeToken.substring(1)));
            if (actRange) {
                referencedNode = ds["@graph"].find((el) => el["@id"] ===
                    (actRange === null || actRange === void 0 ? void 0 : actRange["sh:node"]["@id"]));
            }
        }
    }
    else {
        actRange = actDsObj.find((el) => el["sh:datatype"] === pathTokens[0] ||
            (el["sh:node"] &&
                el["sh:node"]["sh:class"] &&
                checkClassMatch(el["sh:node"]["sh:class"], pathTokens[0].split(","))) ||
            (el["sh:node"] &&
                el["sh:node"]["@id"].endsWith(pathTokens[0].substring(1))));
    }
    if (!actRange) {
        throw new Error("Could not find a fitting range-node for path-token " + pathTokens[0]);
    }
    if (pathTokens.length === 1) {
        if (resolveReference && referencedNode) {
            return referencedNode;
        }
        else if (actRange["sh:node"]) {
            return actRange["sh:node"];
        }
        else {
            return actRange;
        }
    }
    else {
        if (referencedNode) {
            return getPropertyNode(referencedNode["sh:property"], actRestPath.substring(pathTokens[0].length + 1), ds, resolveReference);
        }
        else {
            return getPropertyNode(actRange["sh:node"]["sh:property"], actRestPath.substring(pathTokens[0].length + 1), ds, resolveReference);
        }
    }
}
function getPropertyNode(actDsObj, actRestPath, ds, resolveReference) {
    const pathTokens = actRestPath.split("/");
    const actProp = actDsObj.find((el) => el["sh:path"] === pathTokens[0]);
    if (!actProp) {
        throw new Error("Could not find a fitting property-node for path-token " + pathTokens[0]);
    }
    if (pathTokens.length === 1) {
        return actProp;
    }
    else {
        return getRangeNode(actProp["sh:or"], actRestPath.substring(pathTokens[0].length + 1), ds, resolveReference);
    }
}

},{"../structure/getDsRootNode.fn":44}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathIdentifyNodeType = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const dsPathGetNode_fn_1 = require("./dsPathGetNode.fn");
const helper_1 = require("../../../base/helper/helper");
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
function dsPathIdentifyNodeType(dsNode, ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    const contextNode = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, "@context");
    if ((0, helper_1.deepEqual)(dsNode, contextNode)) {
        return pathGrammar_data_1.pathGrammarNodeTypes.context;
    }
    if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
        if (dsNode["@id"] === rootNode["@id"]) {
            return pathGrammar_data_1.pathGrammarNodeTypes.refRoot;
        }
        else if (dsNode["@id"].startsWith(rootNode["@id"])) {
            return pathGrammar_data_1.pathGrammarNodeTypes.refInt;
        }
        else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
            return pathGrammar_data_1.pathGrammarNodeTypes.refIntExt;
        }
        else {
            return pathGrammar_data_1.pathGrammarNodeTypes.refExt;
        }
    }
    if (dsNode["@type"] === "ds:DomainSpecification") {
        return pathGrammar_data_1.pathGrammarNodeTypes.root;
    }
    else if (dsNode["@type"] === "sh:NodeShape" &&
        ds["@graph"].find((el) => el["@id"] === dsNode["@id"]) !== undefined) {
        if (dsNode["@id"].startsWith(rootNode["@id"])) {
            return pathGrammar_data_1.pathGrammarNodeTypes.defInt;
        }
        else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
            return pathGrammar_data_1.pathGrammarNodeTypes.defIntExt;
        }
        else {
            return pathGrammar_data_1.pathGrammarNodeTypes.defExt;
        }
    }
    if (dsNode["@type"] === "sh:PropertyShape") {
        return pathGrammar_data_1.pathGrammarNodeTypes.property;
    }
    if (dsNode["sh:datatype"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.dataType;
    }
    if (dsNode["@type"] === "sh:NodeShape" && dsNode["sh:in"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.enumeration;
    }
    else if (dsNode["@type"] === "sh:NodeShape" &&
        dsNode["sh:property"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.class;
    }
    else if (dsNode["@type"] === "sh:NodeShape" &&
        dsNode["sh:class"] !== undefined) {
        return pathGrammar_data_1.pathGrammarNodeTypes.class;
    }
    throw new Error("Could not identify a valid Path Grammar Node Type for the given input.");
}
exports.dsPathIdentifyNodeType = dsPathIdentifyNodeType;

},{"../../../base/helper/helper":6,"../../data/pathGrammar.data":34,"../structure/getDsRootNode.fn":44,"./dsPathGetNode.fn":37}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathInit = void 0;
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
function dsPathInit(nodeType = pathGrammar_data_1.pathGrammarNodeTypes.root, nodeId) {
    switch (nodeType) {
        case pathGrammar_data_1.pathGrammarNodeTypes.root:
            return "$";
        case pathGrammar_data_1.pathGrammarNodeTypes.defInt:
            return "#" + (nodeId === null || nodeId === void 0 ? void 0 : nodeId.split("#")[1]);
        case pathGrammar_data_1.pathGrammarNodeTypes.defExt:
            return nodeId.split("/").pop();
        case pathGrammar_data_1.pathGrammarNodeTypes.defIntExt:
            return nodeId.split("/").pop();
        case pathGrammar_data_1.pathGrammarNodeTypes.context:
            return "@context";
        default:
            throw new Error("Unknown node type to initialize a DS Path: " + nodeType);
    }
}
exports.dsPathInit = dsPathInit;

},{"../../data/pathGrammar.data":34}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeDsPath = void 0;
const dsPathGetNode_fn_1 = require("./dsPathGetNode.fn");
const identifyDsGrammarNodeType_fn_1 = require("../structure/identifyDsGrammarNodeType.fn");
const dsPathIdentifyNodeType_fn_1 = require("./dsPathIdentifyNodeType.fn");
const prettyPrintCompactedIRIs_fn_1 = require("../../../base/functions/prettyPrintCompactedIRIs.fn");
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
const getDataTypeLabel_fn_1 = require("../ui/getDataTypeLabel.fn");
function tokenizeDsPath(ds, dsPath) {
    let currentPath = "";
    let restPath = dsPath;
    const result = [];
    while (restPath !== "") {
        let currentToken;
        if (restPath === dsPath && restPath.startsWith("$")) {
            currentToken = "$";
        }
        else if (restPath === dsPath && restPath.startsWith("@context")) {
            currentToken = "@context";
        }
        else if (restPath === dsPath && restPath.startsWith("#")) {
            const limiter = restPath.indexOf(".");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else if (restPath === dsPath &&
            !dsPath.startsWith("#") &&
            !dsPath.startsWith("@") &&
            !dsPath.startsWith("$")) {
            const limiter = restPath.indexOf(".");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else if (restPath.startsWith(".")) {
            const limiter = restPath.indexOf("/");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else if (restPath.startsWith("/")) {
            const limiter = restPath.indexOf(".");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else {
            throw new Error("Could not find a valid token match for '" + restPath + "'.");
        }
        currentPath = currentPath + currentToken;
        restPath = restPath.substring(currentToken.length);
        result.push(createDsPathToken(ds, currentToken, currentPath, restPath));
    }
    return result;
}
exports.tokenizeDsPath = tokenizeDsPath;
function createDsPathToken(ds, token, currentPath, restPath) {
    const dsNodeResolvedReference = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, currentPath, true);
    const dsNodeUnresolvedReference = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, currentPath, false);
    const grammarNodeType = (0, identifyDsGrammarNodeType_fn_1.identifyDsGrammarNodeType)(dsNodeResolvedReference, ds, true);
    const dsPathNodeType = (0, dsPathIdentifyNodeType_fn_1.dsPathIdentifyNodeType)(dsNodeUnresolvedReference, ds);
    let label;
    if (token === "@context") {
        label = "@context";
    }
    else if (dsPathNodeType === pathGrammar_data_1.pathGrammarNodeTypes.property) {
        label = (0, prettyPrintCompactedIRIs_fn_1.prettyPrintCompactedIRIs)(dsNodeResolvedReference["sh:path"]);
    }
    else if (dsPathNodeType === pathGrammar_data_1.pathGrammarNodeTypes.dataType) {
        label = (0, getDataTypeLabel_fn_1.getDataTypeLabel)(dsNodeResolvedReference["sh:datatype"]);
    }
    else {
        label = (0, prettyPrintCompactedIRIs_fn_1.prettyPrintCompactedIRIs)(dsNodeResolvedReference["sh:class"]);
    }
    return {
        token,
        label,
        grammarNodeType,
        dsPathNodeType,
        currentPath,
        restPath,
    };
}

},{"../../../base/functions/prettyPrintCompactedIRIs.fn":5,"../../data/pathGrammar.data":34,"../structure/identifyDsGrammarNodeType.fn":47,"../ui/getDataTypeLabel.fn":50,"./dsPathGetNode.fn":37,"./dsPathIdentifyNodeType.fn":38}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInnerNodeId = void 0;
const getDsId_fn_1 = require("./getDsId.fn");
const nanoid_1 = require("nanoid");
function generateInnerNodeId(ds) {
    let dsId;
    let newId;
    if (ds) {
        dsId = (0, getDsId_fn_1.getDsId)(ds);
    }
    const nanoid = (0, nanoid_1.customAlphabet)("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 5);
    do {
        newId = nanoid();
    } while (ds !== undefined && JSON.stringify(ds).includes(dsId + "#" + newId));
    return newId;
}
exports.generateInnerNodeId = generateInnerNodeId;

},{"./getDsId.fn":43,"nanoid":62}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDataTypeForSchemaDataType = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getDsDataTypeForSchemaDataType(schemaDataType) {
    const match = Object.keys(datatypes_data_1.dataTypeMapping).find((el) => {
        return datatypes_data_1.dataTypeMapping[el] === schemaDataType;
    });
    if (!match) {
        throw new Error("Given input '" +
            schemaDataType +
            "' is not a valid schema.org datatype in DS-V7.");
    }
    return match;
}
exports.getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;

},{"../../data/datatypes.data":24}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsId = void 0;
const getDsRootNode_fn_1 = require("./getDsRootNode.fn");
function getDsId(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["@id"]) {
        throw new Error("The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format.");
    }
    return rootNode["@id"];
}
exports.getDsId = getDsId;

},{"./getDsRootNode.fn":44}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsRootNode = void 0;
function getDsRootNode(ds) {
    if (!ds["@graph"]) {
        throw new Error("The given DS has no @graph array, which is mandatory for a DS in DS-V7 format.");
    }
    const rootNode = ds["@graph"].find((el) => el["@type"] === "ds:DomainSpecification");
    if (!rootNode) {
        throw new Error("The given DS has no identifiable root node in DS-V7 format.");
    }
    return rootNode;
}
exports.getDsRootNode = getDsRootNode;

},{}],45:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"../../../base/helper/helper":6,"../../data/standardContext.data":35,"dup":14}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaDataTypeForDsDataType = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getSchemaDataTypeForDsDataType(dsDataType) {
    const match = datatypes_data_1.dataTypeMapping[dsDataType];
    if (!match) {
        throw new Error("Given input '" +
            dsDataType +
            "' is not a valid xsd/rdf datatype in DS-V7.");
    }
    return match;
}
exports.getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;

},{"../../data/datatypes.data":24}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyDsGrammarNodeType = void 0;
const getDsRootNode_fn_1 = require("./getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
const dsGrammar_data_1 = require("../../data/dsGrammar.data");
const dsPathGetNode_fn_1 = require("../path/dsPathGetNode.fn");
function identifyDsGrammarNodeType(dsNode, ds, followReference, sdoAdapter) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    const contextNode = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, "@context");
    if ((0, helper_1.deepEqual)(dsNode, contextNode)) {
        return dsGrammar_data_1.dsGrammarNodeTypes.context;
    }
    if ((0, helper_1.deepEqual)(dsNode, rootNode)) {
        return dsGrammar_data_1.dsGrammarNodeTypes.root;
    }
    if (dsNode["@type"] === "sh:PropertyShape") {
        return dsGrammar_data_1.dsGrammarNodeTypes.property;
    }
    if (dsNode["sh:datatype"]) {
        return dsGrammar_data_1.dsGrammarNodeTypes.dataType;
    }
    if (dsNode["@type"] === "sh:NodeShape") {
        if (dsNode["sh:property"]) {
            return dsGrammar_data_1.dsGrammarNodeTypes.classRestricted;
        }
        if (dsNode["sh:in"]) {
            return dsGrammar_data_1.dsGrammarNodeTypes.enumerationRestricted;
        }
        if (dsNode["sh:class"].length === 1 && sdoAdapter) {
            try {
                sdoAdapter.getEnumeration(dsNode["sh:class"][0]);
                return dsGrammar_data_1.dsGrammarNodeTypes.enumerationStandard;
            }
            catch (e) {
                return dsGrammar_data_1.dsGrammarNodeTypes.classStandard;
            }
        }
        else {
            return dsGrammar_data_1.dsGrammarNodeTypes.classStandard;
        }
    }
    if (dsNode["@id"]) {
        const match = ds["@graph"].find((el) => {
            return dsNode["@id"] === el["@id"];
        });
        if (match) {
            if (followReference) {
                return identifyDsGrammarNodeType(match, ds, followReference, sdoAdapter);
            }
            else {
                if (rootNode["@id"] === match["@id"]) {
                    return dsGrammar_data_1.dsGrammarNodeTypes.refRoot;
                }
                else if (match["@id"].startsWith(rootNode["@id"])) {
                    return dsGrammar_data_1.dsGrammarNodeTypes.refInternal;
                }
                else if (match["@id"].includes("#")) {
                    return dsGrammar_data_1.dsGrammarNodeTypes.refInternalExternal;
                }
                else {
                    return dsGrammar_data_1.dsGrammarNodeTypes.refExternal;
                }
            }
        }
        return dsGrammar_data_1.dsGrammarNodeTypes.enumerationMember;
    }
    throw new Error("Could not find a match for the given DS Node.");
}
exports.identifyDsGrammarNodeType = identifyDsGrammarNodeType;

},{"../../../base/helper/helper":6,"../../data/dsGrammar.data":25,"../path/dsPathGetNode.fn":37,"./getDsRootNode.fn":44}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderDs = void 0;
const helper_1 = require("../../../base/helper/helper");
const LanguageTaggedString_nodeSchema_1 = require("../../../base/data/LanguageTaggedString.nodeSchema");
const reorderDsNode_fn_1 = require("./reorderDsNode.fn");
const Ds_nodeSchema_1 = require("../../data/nodeSchemas/Ds.nodeSchema");
const Context_nodeSchema_1 = require("../../data/nodeSchemas/Context.nodeSchema");
function reorderDs(ds) {
    if (!(0, helper_1.isObject)(ds)) {
        throw new Error("The given input was not an object, as required.");
    }
    (0, helper_1.reorderNodeWithSchema)(ds, Ds_nodeSchema_1.nodeSchemaDs);
    (0, helper_1.reorderNodeWithSchema)(ds["@context"], Context_nodeSchema_1.nodeSchemaContext);
    const indexOfRootNode = ds["@graph"].findIndex((el) => el["@type"] === "ds:DomainSpecification");
    if (indexOfRootNode !== 0) {
        ds["@graph"] = [
            ds["@graph"][indexOfRootNode],
            ...ds["@graph"].slice(0, indexOfRootNode),
            ...ds["@graph"].slice(indexOfRootNode + 1),
        ];
    }
    for (const graphNode of ds["@graph"]) {
        reorderClassLikeNode(graphNode);
    }
}
exports.reorderDs = reorderDs;
function reorderClassLikeNode(classNode) {
    (0, reorderDsNode_fn_1.reorderDsNode)(classNode);
    reorderMetaPropertyIfExists(classNode, "schema:name");
    reorderMetaPropertyIfExists(classNode, "schema:description");
    reorderMetaPropertyIfExists(classNode, "rdfs:label");
    reorderMetaPropertyIfExists(classNode, "rdfs:comment");
    if (classNode["sh:property"]) {
        for (const propertyNode of classNode["sh:property"]) {
            reorderPropertyNode(propertyNode);
        }
    }
}
function reorderPropertyNode(propertyNode) {
    (0, reorderDsNode_fn_1.reorderDsNode)(propertyNode);
    reorderMetaPropertyIfExists(propertyNode, "rdfs:label");
    reorderMetaPropertyIfExists(propertyNode, "rdfs:comment");
    for (const rangeNode of propertyNode["sh:or"]) {
        (0, reorderDsNode_fn_1.reorderDsNode)(rangeNode);
        reorderMetaPropertyIfExists(rangeNode, "rdfs:label");
        reorderMetaPropertyIfExists(rangeNode, "rdfs:comment");
        if (rangeNode["sh:node"]) {
            reorderClassLikeNode(rangeNode["sh:node"]);
        }
    }
}
function reorderMetaPropertyIfExists(dsNode, term) {
    if (dsNode[term]) {
        reorderMetaValues(dsNode[term]);
    }
}
function reorderMetaValues(valuesArray) {
    for (const valObj of valuesArray) {
        (0, helper_1.reorderNodeWithSchema)(valObj, LanguageTaggedString_nodeSchema_1.nodeSchemaLanguageTaggedString);
    }
}

},{"../../../base/data/LanguageTaggedString.nodeSchema":2,"../../../base/helper/helper":6,"../../data/nodeSchemas/Context.nodeSchema":27,"../../data/nodeSchemas/Ds.nodeSchema":29,"./reorderDsNode.fn":49}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderDsNode = void 0;
const helper_1 = require("../../../base/helper/helper");
const Root_nodeSchema_1 = require("../../data/nodeSchemas/Root.nodeSchema");
const Property_nodeSchema_1 = require("../../data/nodeSchemas/Property.nodeSchema");
const Enumeration_nodeSchema_1 = require("../../data/nodeSchemas/Enumeration.nodeSchema");
const Class_nodeSchema_1 = require("../../data/nodeSchemas/Class.nodeSchema");
const Ds_nodeSchema_1 = require("../../data/nodeSchemas/Ds.nodeSchema");
const Context_nodeSchema_1 = require("../../data/nodeSchemas/Context.nodeSchema");
const DataType_nodeSchema_1 = require("../../data/nodeSchemas/DataType.nodeSchema");
const LanguageTaggedString_nodeSchema_1 = require("../../../base/data/LanguageTaggedString.nodeSchema");
const EnumerationMember_nodeSchema_1 = require("../../data/nodeSchemas/EnumerationMember.nodeSchema");
function reorderDsNode(dsNode) {
    if (!(0, helper_1.isObject)(dsNode)) {
        throw new Error("The given input was not an object, as required.");
    }
    if (dsNode["@type"]) {
        switch (dsNode["@type"]) {
            case "ds:DomainSpecification":
                (0, helper_1.reorderNodeWithSchema)(dsNode, Root_nodeSchema_1.nodeSchemaRoot);
                break;
            case "sh:PropertyShape":
                (0, helper_1.reorderNodeWithSchema)(dsNode, Property_nodeSchema_1.nodeSchemaProperty);
                break;
            case "sh:NodeShape":
                if (dsNode["sh:in"]) {
                    (0, helper_1.reorderNodeWithSchema)(dsNode, Enumeration_nodeSchema_1.nodeSchemaEnumeration);
                }
                else {
                    (0, helper_1.reorderNodeWithSchema)(dsNode, Class_nodeSchema_1.nodeSchemaClass);
                }
                break;
        }
    }
    else if (dsNode["@context"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, Ds_nodeSchema_1.nodeSchemaDs);
    }
    else if (dsNode.ds && dsNode.schema && dsNode.sh) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, Context_nodeSchema_1.nodeSchemaContext);
    }
    else if (dsNode["sh:datatype"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, DataType_nodeSchema_1.nodeSchemaDataType);
    }
    else if (dsNode["sh:node"]) {
    }
    else if (dsNode["@value"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, LanguageTaggedString_nodeSchema_1.nodeSchemaLanguageTaggedString);
    }
    else if (dsNode["@id"]) {
        (0, helper_1.reorderNodeWithSchema)(dsNode, EnumerationMember_nodeSchema_1.nodeSchemaEnumerationMember);
    }
}
exports.reorderDsNode = reorderDsNode;

},{"../../../base/data/LanguageTaggedString.nodeSchema":2,"../../../base/helper/helper":6,"../../data/nodeSchemas/Class.nodeSchema":26,"../../data/nodeSchemas/Context.nodeSchema":27,"../../data/nodeSchemas/DataType.nodeSchema":28,"../../data/nodeSchemas/Ds.nodeSchema":29,"../../data/nodeSchemas/Enumeration.nodeSchema":30,"../../data/nodeSchemas/EnumerationMember.nodeSchema":31,"../../data/nodeSchemas/Property.nodeSchema":32,"../../data/nodeSchemas/Root.nodeSchema":33}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataTypeLabel = void 0;
const datatypes_data_1 = require("../../data/datatypes.data");
function getDataTypeLabel(dsDataType) {
    const match = datatypes_data_1.dataTypeMappingToLabel[dsDataType];
    if (!match) {
        throw new Error("Given input '" +
            dsDataType +
            "' is not a valid xsd/rdf datatype in DS-V7.");
    }
    return match;
}
exports.getDataTypeLabel = getDataTypeLabel;

},{"../../data/datatypes.data":24}],51:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"../structure/getDsRootNode.fn":44,"dup":16}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsDescription = void 0;
const helper_1 = require("../../../base/helper/helper");
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsDescription(ds, language) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:description"]) {
        return (0, helper_1.getLanguageString)(rootNode["schema:description"], language);
    }
    return undefined;
}
exports.getDsDescription = getDsDescription;

},{"../../../base/helper/helper":6,"../structure/getDsRootNode.fn":44}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsExternalVocabularies = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsExternalVocabularies(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["ds:usedVocabulary"]) {
        return (0, helper_1.cloneJson)(rootNode["ds:usedVocabulary"]);
    }
    return [];
}
exports.getDsExternalVocabularies = getDsExternalVocabularies;

},{"../../../base/helper/helper":6,"../structure/getDsRootNode.fn":44}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsName = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsName(ds, language) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:name"]) {
        return (0, helper_1.getLanguageString)(rootNode["schema:name"], language);
    }
    return undefined;
}
exports.getDsName = getDsName;

},{"../../../base/helper/helper":6,"../structure/getDsRootNode.fn":44}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsSchemaVersion = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsSchemaVersion(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["schema:schemaVersion"]) {
        throw new Error("The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V7 format.");
    }
    return rootNode["schema:schemaVersion"];
}
exports.getDsSchemaVersion = getDsSchemaVersion;

},{"../structure/getDsRootNode.fn":44}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsTargetClasses = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const helper_1 = require("../../../base/helper/helper");
function getDsTargetClasses(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["sh:targetClass"]) {
        return (0, helper_1.cloneJson)(rootNode["sh:targetClass"]);
    }
    return [];
}
exports.getDsTargetClasses = getDsTargetClasses;

},{"../../../base/helper/helper":6,"../structure/getDsRootNode.fn":44}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsVersion = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function getDsVersion(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (rootNode["schema:version"]) {
        return rootNode["schema:version"];
    }
    return undefined;
}
exports.getDsVersion = getDsVersion;

},{"../structure/getDsRootNode.fn":44}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEntry = void 0;
class ErrorEntry {
    constructor(severity, path, description) {
        this.severity = severity;
        this.path = path;
        this.description = description;
    }
}
exports.ErrorEntry = ErrorEntry;

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationReport = void 0;
class VerificationReport {
    constructor(result = "Valid", errors = []) {
        this.result = result;
        this.errors = errors;
    }
    addErrorEntry(e) {
        this.errors.push(e);
        this.updateResult();
    }
    updateResult() {
        const invalid = this.errors.find((el) => el.severity === "Error" || el.severity === "Critical");
        if (invalid) {
            this.result = "Invalid";
        }
        else {
            const ValidWithWarnings = this.errors.find((el) => el.severity === "Warning");
            if (ValidWithWarnings) {
                this.result = "ValidWithWarnings";
            }
            else {
                this.result = "Valid";
            }
        }
    }
    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
}
exports.VerificationReport = VerificationReport;

},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkClassMatch = void 0;
function checkClassMatch(targetClasses, classesToCheck, sdoAdapter) {
    const superClassesArray = [];
    classesToCheck.map((c) => superClassesArray.push(...[c, ...sdoAdapter.getClass(c).getSuperClasses()]));
    const superClassSet = Array.from(new Set(superClassesArray));
    return targetClasses.every((tc) => superClassSet.includes(tc));
}
exports.checkClassMatch = checkClassMatch;

},{}],61:[function(require,module,exports){
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
        const result = typeof value;
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

},{"../../../base/helper/helper":6,"../../data/nodeSchemas/Class.nodeSchema":26,"../../data/nodeSchemas/Context.nodeSchema":27,"../../data/nodeSchemas/DataType.nodeSchema":28,"../../data/nodeSchemas/Ds.nodeSchema":29,"../../data/nodeSchemas/Enumeration.nodeSchema":30,"../../data/nodeSchemas/Property.nodeSchema":32,"../../data/nodeSchemas/Root.nodeSchema":33,"../../data/pathGrammar.data":34,"../path/dsPathAddition.fn":36,"../path/dsPathIdentifyNodeType.fn":38,"../path/dsPathInit.fn":39,"../structure/getDsRootNode.fn":44,"./ErrorEntry":58,"./VerificationReport":59}],62:[function(require,module,exports){
let { urlAlphabet } = require('./url-alphabet/index.cjs')
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}
module.exports = { nanoid, customAlphabet, customRandom, urlAlphabet, random }

},{"./url-alphabet/index.cjs":63}],63:[function(require,module,exports){
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
module.exports = { urlAlphabet }

},{}]},{},[7])(7)
});
