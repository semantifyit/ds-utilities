const DsUtilitiesBase = require("./DsUtilitiesBase.js");
const fV5 = require("./functions/functionsV5.js");

/**
 * A DsUtilities instance that offers an API for DS-V5
 * @class
 */
class DsUtilitiesV5 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "5.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV5.getDsRootNodeV5;
    this.getDsStandardContext = fV5.getDsStandardContextV5;
    this.getDsId = fV5.getDsIdV5;
    // this.reorderDsNode = reorderDsNodeV5;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.getDsNodeForPath = getDsNodeForPathV5; // e.g. "$.schema:address/schema:PostalAddress"
    // functions that ease the UI interaction with DS
    this.getDsName = fV5.getDsNameV5;
    this.getDsDescription = fV5.getDsDescriptionV5;
    this.getDsAuthorName = fV5.getDsAuthorV5;
    this.getDsSchemaVersion = fV5.getDsSchemaVersionV5;
    this.getDsVersion = fV5.getDsVersionV5;
    this.getDsExternalVocabularies = fV5.getDsExternalVocabulariesV5;
    this.getDsTargetClasses = fV5.getDsTargetClassesV5;
  }
}

module.exports = DsUtilitiesV5;
