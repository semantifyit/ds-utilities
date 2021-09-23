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

const reorderNodeBasedOnNodeTermArray = (dsNode, nodeTermArray) => {
  // always use first the terms used in nodeTermArray, then add any terms that are not listed there
  const dsNodeCopy = jhcpy(dsNode);
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

module.exports = {
  jhcpy,
  getLanguageString,
  reorderNodeBasedOnNodeTermArray,
  isObject,
};
