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
//# sourceMappingURL=helper.js.map