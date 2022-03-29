import { SDOAdapter } from "schema-org-adapter";

/**
 * Returns `true` if the given classes are a valid match for the given targetClasses following the [DS-V7 semantics](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/verificationreport/ds-verification#semantics-for-class-matching).
 *
 * This matching is important for the Class-SubClass relationship (e.g. subDS, or range subclass)
 *
 * This function needs the [SDO-Adapter library](https://www.npmjs.com/package/schema-org-adapter) to work. The given `sdoAdapter` must be already initialized with the wished vocabularies.
 *
 * @example
 * ```JS
 * const isMatch = myDsUtilitiesV7.checkClassMatch(
 *  [ "schema:LodgingBusiness" ],
 *  [ "schema:Hotel" ],
 *  sdoAdapterInstance
 * );
 * // "true" - (Hotel is a subclass of LodgingBusiness)
 * ```
 *
 * @param targetClasses - The target classes (DS)
 * @param classesToCheck  - The classes to be checked (Data)
 * @param sdoAdapter - A SDO-Adapter instance
 * @return `true` if the given classes to check are valid for the given target classes
 */
export function checkClassMatch(
  targetClasses: string[],
  classesToCheck: string[],
  sdoAdapter: SDOAdapter
): boolean {
  // get a set of all superclasses (including themselves) from the classesToCheck
  const superClassesArray: string[] = [];
  classesToCheck.map((c) =>
    superClassesArray.push(...[c, ...sdoAdapter.getClass(c).getSuperClasses()])
  );
  const superClassSet = Array.from(new Set(superClassesArray));
  return targetClasses.every((tc) => superClassSet.includes(tc));
}
