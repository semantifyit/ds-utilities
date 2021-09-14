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
