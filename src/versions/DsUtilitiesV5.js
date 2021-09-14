const DsUtilitiesBase = require("./DsUtilitiesBase.js");
const fV5 = require("./functions/functionsV5.js");

class DsUtilitiesV5 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "5.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV5.getDsRootNodeV5;
    this.getDsStandardContext = getDsStandardContextV5;
    this.getDsId = getDsIdV7;
    this.reorderDsNode = reorderDsNodeV7;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    this.getDsNodeForPath = getDsNodeForPathV7; // e.g. "$.schema:address/schema:PostalAddress"
    // functions that ease the UI interaction with DS
    this.getDsName = getDsNameV7;
    this.getDsDescription = getDsDescriptionV7;
    this.getDsAuthorName = getDsAuthorV7;
    this.getDsSchemaVersion = getDsSchemaVersionV7;
    this.getDsVersion = getDsVersionV7;
    this.getDsExternalVocabularies = getDsExternalVocabulariesV7;
    this.getDsTargetClasses = getDsTargetClassesV7;
  }
}

module.exports = DsUtilitiesV5;
