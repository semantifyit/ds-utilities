/**
 * This is the super class for all DsUtilities classes
 * It includes functions that are shared by all DsUtilities classes
 */
const fBase = require("./functions/functionsBase.js");

class DsUtilitiesBase {
  constructor() {
    // the dsUtilitiesVersion specifies the version of a DsUtilities Class, which is exactly the same as the corresponding DS specification version
    // DsUtilitiesBase is a super-class for all DsUtilities versions, therefore, it has no corresponding Ds specification version
    this.dsUtilitiesVersion = undefined;
    // functions that handle the structure of DS
    this.getDsSpecificationVersion = fBase.getDsSpecificationVersion;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.initDsPathForDsRoot = initDsPathForDsRoot; todo this should also be version specific
    // this.initDsPathForInternalReference = initDsPathForInternalReference; // from DS-V7 upwards
    // this.addPropertyToDsPath = addPropertyToDsPath;
    // this.addRangeToDsPath = addRangeToDsPath;
    // functions that ease the UI interaction with DS
    this.prettyPrintCompactedIRI = fBase.prettyPrintCompactedIRI;
    this.extractSdoVersionNumber = fBase.extractSdoVersionNumber;
  }
}

module.exports = DsUtilitiesBase;
