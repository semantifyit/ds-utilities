/**
 * Creates a clone of the given JSON input (without reference to the original input)
 *
 * @param input {any} - the input
 * @return {any} - the clone of the input (no reference)
 */
const cloneJson = (input) => {
  if (input === undefined) {
    return undefined;
  }
  return JSON.parse(JSON.stringify(input));
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

const reorderNodeBasedOnNodeTermArray = (dsNode, nodeTermArray) => {
  // always use first the terms used in nodeTermArray, then add any terms that are not listed there
  const dsNodeCopy = cloneJson(dsNode);
  // delete all used terms
  for (const p of Object.keys(dsNode)) {
    delete dsNode[p];
  }
  // add all known terms by order
  for (const t of nodeTermArray) {
    const term = t.term;
    if (dsNodeCopy[term] !== undefined) {
      dsNode[term] = dsNodeCopy[term];
    }
  }
  // add all unknown terms by order of their appearance in the original object
  for (const p of Object.keys(dsNodeCopy)) {
    const standardTerm = nodeTermArray.find((el) => el.term === p);
    if (standardTerm === undefined) {
      dsNode[p] = dsNodeCopy[p];
    }
  }
};

// checks if a given input is really an object
const isObject = (val) => {
  return val instanceof Object && !(val instanceof Array);
};

// returns true if two given objects are deeply equal
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
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}

module.exports = {
  cloneJson,
  getLanguageString,
  reorderNodeBasedOnNodeTermArray,
  isObject,
  deepEqual,
};
