"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsUtilitiesForDs = exports.getDsUtilitiesForDsSpecVersion = exports.availableVersions = void 0;
const DsUtilitiesV7_1 = require("./v7/DsUtilitiesV7");
const getDsSpecificationVersion_fn_1 = require("./base/functions/getDsSpecificationVersion.fn");
const DsUtilitiesV5_1 = require("./v5/DsUtilitiesV5");
exports.availableVersions = {
    "7.0": DsUtilitiesV7_1.DsUtilitiesV7,
    "5.0": DsUtilitiesV5_1.DsUtilitiesV5,
};
function getDsUtilitiesForDsSpecVersion(dsSpecVersion) {
    if (!Object.keys(exports.availableVersions).includes(dsSpecVersion)) {
        throw new Error("The given DS Specification Version " +
            dsSpecVersion +
            " is unknown to DsUtilities.");
    }
    return new exports.availableVersions[dsSpecVersion];
}
exports.getDsUtilitiesForDsSpecVersion = getDsUtilitiesForDsSpecVersion;
function getDsUtilitiesForDs(ds) {
    const dsVersion = (0, getDsSpecificationVersion_fn_1.getDsSpecificationVersion)(ds);
    return getDsUtilitiesForDsSpecVersion(dsVersion);
}
exports.getDsUtilitiesForDs = getDsUtilitiesForDs;
//# sourceMappingURL=index.js.map