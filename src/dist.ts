import { DsUtilitiesV7 } from "./v7/DsUtilitiesV7";
import { DsGeneric } from "./base/types/DsGrammarGeneric.type";
import { getDsSpecificationVersion } from "./base/functions/getDsSpecificationVersion.fn";
import { DsUtilitiesV5 } from "./v5/DsUtilitiesV5";
import { AvailableVersions } from "./base/types/AvailableVersions.type";

// AvailableVersions as data
const AV = {
  "7.0": DsUtilitiesV7,
  "5.0": DsUtilitiesV5,
};

/**
 * Returns the available DS-Specification versions that are supported by this library as an array of strings.
 *
 * @example
 * ```JS
 * const versions = DsUtil.getAvailableVersions();
 * // [ "7.0", "5.0" ]
 * ```
 *
 * @returns available versions as an array string
 */
function getAvailableVersions(): string[] {
  return Object.keys(AV);
}

/**
 * Creates a corresponding DS-Utilities instance based on the DS-Specification version given.
 *
 * @example
 * ```JS
 * const myDsUtilities = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
 * // returns a new DsUtilitiesV7 instance
 * ```
 *
 * @param dsSpecVersion - the desired DS-Specification version
 * @returns a corresponding DS-Utilities instance
 */
function getDsUtilitiesForDsSpecVersion<T extends keyof AvailableVersions>(
  dsSpecVersion: T
): AvailableVersions[T] {
  if (!Object.keys(AV).includes(dsSpecVersion)) {
    throw new Error(
      "The given DS Specification Version " +
        dsSpecVersion +
        " is unknown to DsUtilities."
    );
  }
  return new AV[dsSpecVersion]() as AvailableVersions[T];
}

/**
 * Creates a corresponding DS-Utilities instance based on the DS-Specification version used by the given input Domain Specification.
 *
 * @example
 * ```JS
 * const myDsUtilities = DsUtil.getDsUtilitiesForDs(myDs);
 * // returns a new DsUtilitiesV7 instance (assuming the given DS 'myDs' uses DsV7)
 * ```
 *
 * @param ds - the input DS
 * @returns a corresponding DS-Utilities instance
 */
function getDsUtilitiesForDs<T extends keyof AvailableVersions>(
  ds: DsGeneric
): AvailableVersions[T] {
  const dsVersion = getDsSpecificationVersion(ds) as T;
  return getDsUtilitiesForDsSpecVersion(dsVersion);
}

// export as separate functions for bundled dist
export {
  getAvailableVersions,
  getDsUtilitiesForDsSpecVersion,
  getDsUtilitiesForDs,
};
