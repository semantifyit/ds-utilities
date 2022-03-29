import { LanguageTaggedString } from "../types/LanguageTaggedString.type";
import { NodeSchema } from "../types/NodeSchema.type";
import { DsNodeGeneric } from "../types/DsGrammarGeneric.type";

/**
 * Creates a clone of the given JSON input (without reference to the original input)
 *
 * @param input - the JSON element that should be copied
 * @returns copy of the given JSON element
 */
export function cloneJson<T>(input: T): T {
  if (input === undefined) {
    return input;
  }
  return JSON.parse(JSON.stringify(input));
}

/**
 * Returns the corresponding value for the specified language tag, or the first value in the given array of values if no language tag was specified
 *
 * @param valuesArray - an array of language-tagged strings
 * @param language -  a specific language
 * @returns the corresponding value
 */
export function getLanguageString(
  valuesArray: LanguageTaggedString[],
  language?: string
) {
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
}

/**
 * Alters the order of the properties for the given node, according to the given NodeSchema
 *
 * @param dsNode - the node that should be altered
 * @param nodeSchema - a node schema that should be used to alter the given node
 */
export function reorderNodeWithSchema(
  dsNode: DsNodeGeneric,
  nodeSchema: NodeSchema
): void {
  // always use first the terms used in nodeSchema, then add any terms that are not listed there
  const dsNodeCopy = cloneJson(dsNode);
  // delete all used terms
  for (const p of Object.keys(dsNode)) {
    delete dsNode[p];
  }
  // add all known terms by order
  for (const t of nodeSchema) {
    const term = t.term;
    if (dsNodeCopy[term] !== undefined) {
      dsNode[term] = dsNodeCopy[term];
    }
  }
  // add all unknown terms by order of their appearance in the original object
  for (const p of Object.keys(dsNodeCopy)) {
    const standardTerm = nodeSchema.find((el) => el.term === p);
    if (standardTerm === undefined) {
      dsNode[p] = dsNodeCopy[p];
    }
  }
}

/**
 * checks if two given objects are deeply equal (they have recursively the same properties and values)
 *
 * @param object1 - the first object to compare
 * @param object2 - the seconds object to compare
 * @returns true, if both given objects are deeply equal
 */
export function deepEqual(
  object1: Record<string, any>,
  object2: Record<string, any>
) {
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

/**
 * checks if a given input is really an object
 *
 * @param val - the value to check
 * @returns true, if the given value is an object
 */
export function isObject(val: unknown) {
  return val instanceof Object && !(val instanceof Array);
}
