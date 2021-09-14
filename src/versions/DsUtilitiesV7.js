const DsUtilitiesBase = require("./DsUtilitiesBase.js");
const fV7 = require("./functions/functionsV7.js");

class DsUtilitiesV7 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "7.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV7.getDsRootNodeV7;
    this.getDsStandardContext = fV7.getDsStandardContextV7;
    this.getDsId = fV7.getDsIdV7;
    // this.reorderDsNode = reorderDsNodeV7;
    // this.generateInnerNodeId = generateInnerNodeId;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.getDsNodeForPath = getDsNodeForPathV7; // e.g. "$.schema:address/schema:PostalAddress"
    // functions that ease the UI interaction with DS
    this.getDsName = fV7.getDsNameV7;
    this.getDsDescription = fV7.getDsDescriptionV7;
    this.getDsAuthorName = fV7.getDsAuthorNameV7;
    this.getDsSchemaVersion = fV7.getDsSchemaVersionV7;
    this.getDsVersion = fV7.getDsVersionV7;
    this.getDsExternalVocabularies = fV7.getDsExternalVocabulariesV7;
    // this.getDsTargetClasses = getDsTargetClassesV7;
  }
}

module.exports = DsUtilitiesV7;
