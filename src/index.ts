import { DsUtilitiesV7 } from "./v7/DsUtilitiesV7";
import { DsGeneric } from "./base/types/DsGrammarGeneric.type";
import { getDsSpecificationVersion } from "./base/functions/getDsSpecificationVersion.fn";
import { DsUtilitiesV5 } from "./v5/DsUtilitiesV5";

export const availableVersions = {
  "7.0": DsUtilitiesV7,
  "5.0": DsUtilitiesV5,
};
// type for the available versions with Class type. Not possible to use typescript typeof for class instances
type availableVersionsType = {
  "7.0": DsUtilitiesV7;
  "5.0": DsUtilitiesV5;
};

export function getDsUtilitiesForDsSpecVersion<
  T extends keyof availableVersionsType
>(dsSpecVersion: T): availableVersionsType[T] {
  if (!Object.keys(availableVersions).includes(dsSpecVersion)) {
    throw new Error(
      "The given DS Specification Version " +
        dsSpecVersion +
        " is unknown to DsUtilities."
    );
  }
  return new availableVersions[dsSpecVersion]() as availableVersionsType[T];
}

export function getDsUtilitiesForDs<T extends keyof availableVersionsType>(
  ds: DsGeneric
): availableVersionsType[T] {
  const dsVersion = getDsSpecificationVersion(ds) as T;
  return getDsUtilitiesForDsSpecVersion(dsVersion);
}
