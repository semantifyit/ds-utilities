const DsUtilitiesBase = require("./versions/DsUtilitiesBase.js");
const DsUtilitiesV5 = require("./versions/DsUtilitiesV5.js");
const DsUtilitiesV7 = require("./versions/DsUtilitiesV7.js");
const myDsUtilitiesForCheck = new DsUtilitiesBase();
const availableDsUtilitiesVersions = ["5.0", "7.0"];

/**
 * Returns a new and corresponding DsUtilities instance for the given ds specification version (e.g. "5.0")
 *
 * @param {string} dsSpecVersion - the given DS specification version
 * @return {DsUtilitiesV7|DsUtilitiesV5} a corresponding DsUtilities instance for the given version
 */
const getDsUtilitiesForDsSpecVersion = (dsSpecVersion) => {
  if (!availableDsUtilitiesVersions.includes(dsSpecVersion)) {
    throw new Error(
      "The given DS Specification Version " +
        dsSpecVersion +
        " is unknown to DsUtilities."
    );
  }
  switch (dsSpecVersion) {
    case "5.0":
      return new DsUtilitiesV5();
    case "7.0":
      return new DsUtilitiesV7();
  }
};

/**
 *  Returns a new and corresponding DsUtilities instance for the given domain specification
 *
 * @param {object} ds - the given DS
 * @return {DsUtilitiesV7|DsUtilitiesV5} a corresponding DsUtilities instance for the given DS
 */
const getDsUtilitiesForDs = (ds) => {
  const dsSpecVersion = myDsUtilitiesForCheck.getDsSpecificationVersion(ds);
  return getDsUtilitiesForDsSpecVersion(dsSpecVersion);
};

module.exports = {
  getDsUtilitiesForDsSpecVersion,
  getDsUtilitiesForDs,
};
