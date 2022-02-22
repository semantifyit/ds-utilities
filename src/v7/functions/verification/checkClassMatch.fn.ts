import { SDOAdapter } from "schema-org-adapter/lib/SDOAdapter";

/**
 * Returns true if the given classes are a valid match for the given targetClasses following the DS-V7 semantics
 * This matching is important for the Class-SubClass relationship (e.g. subDS, or range subclass)
 * https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/verificationreport/ds-verification#semantics-for-class-matching
 * This function needs the SDO-Adapter library to work - https://www.npmjs.com/package/schema-org-adapter
 *
 * @param targetClasses - The target classes (DS)
 * @param classesToCheck  - The classes to be checked (Data)
 * @param sdoAdapter - A SDO-Adapter instance (already initialized with the wished vocabularies)
 * @return True if the given classes to check are valid for the given target classes
 */
export function checkClassMatch(targetClasses: string[], classesToCheck: string[], sdoAdapter: SDOAdapter): boolean {
  // get a set of all superclasses (including themselves) from the classesToCheck
  const superClassesArray: string[] = [];
  classesToCheck.map((c) =>
    superClassesArray.push(...[c, ...sdoAdapter.getClass(c).getSuperClasses()])
  );
  const superClassSet = Array.from(new Set(superClassesArray));
  return targetClasses.every((tc) => superClassSet.includes(tc));
};