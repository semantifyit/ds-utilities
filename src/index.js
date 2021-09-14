// Require
const DsUtilitiesBase = require("./versions/DsUtilitiesBase.js");
const DsUtilitiesV5 = require("./versions/DsUtilitiesV5.js");
const DsUtilitiesV7 = require("./versions/DsUtilitiesV7.js");
// Globals
const myDsUtilitiesForCheck = new DsUtilitiesBase();
const availableDsUtilitiesVersions = ["5.0", "7.0"];

// Return a new and corresponding DsUtilities Instance for the given ds specification version (e.g. "5.0")
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

// Return a new and corresponding DsUtilities Instance for the given domain specification
const getDsUtilitiesForDs = (ds) => {
  const dsSpecVersion = myDsUtilitiesForCheck.getDsSpecificationVersion(ds);
  return getDsUtilitiesForDsSpecVersion(dsSpecVersion);
};

module.exports = {
  getDsUtilitiesForDsSpecVersion,
  getDsUtilitiesForDs,
};
