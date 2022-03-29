import { DsUtilitiesV7 } from "../../v7/DsUtilitiesV7";
import { DsUtilitiesV5 } from "../../v5/DsUtilitiesV5";

/**
 * These are the available DS-Specification versions (with their corresponding DS-Utilities classes) that are supported by this library.
 */
export type AvailableVersions = {
  "7.0": DsUtilitiesV7;
  "5.0": DsUtilitiesV5;
};
