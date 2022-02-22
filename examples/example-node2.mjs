import { getDsUtilitiesForDsSpecVersion } from "./../lib/index.js";

// const myDsUtilitiesV5 = DsUtilities.getDsUtilitiesForDsSpecVersion("5.0");
const myDsUtilitiesV7 = getDsUtilitiesForDsSpecVersion("7.0");
// console.log(myDsUtilitiesV5.getDsStandardContext()); todo
console.log(myDsUtilitiesV7.getDsStandardContext());
