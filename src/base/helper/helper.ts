/** @ignore
 * Creates a clone of the given JSON input (without reference to the original input)
 *
 * @param input - the JSON element that should be copied
 * @returns copy of the given JSON element
 */
import { LanguageTaggedString } from "../types/LanguageTaggedString.type";
import { NodeSchema } from "../types/NodeSchema.type";
import { DsNodeGeneric } from "../types/DsGrammarGeneric.type";

export function cloneJson<T>(input: T): T {
  if (input === undefined) {
    return input;
  }
  return JSON.parse(JSON.stringify(input));
}

export function getLanguageString(valuesArray: LanguageTaggedString[], language?: string) {
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
 * @param dsNode
 * @param nodeSchema
 */
export function reorderNodeWithSchema(dsNode: DsNodeGeneric, nodeSchema: NodeSchema): void {
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

// returns true if two given objects are deeply equal
export function deepEqual(object1: Record<string, any>, object2: Record<string, any>) {
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

// checks if a given input is really an object
export function isObject (val: any) {
  return val instanceof Object && !(val instanceof Array);
}