import { DsUtil } from "./../lib/index.js";

console.log(DsUtil.availableVersions);
const myDsUtilitiesV5 = DsUtil.getDsUtilitiesForDsSpecVersion("5.0");
const myDsUtilitiesV7 = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
console.log(myDsUtilitiesV5.getDsStandardContext());
console.log(myDsUtilitiesV7.getDsStandardContext());
