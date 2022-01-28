const DsUtilitiesBase = require("./DsUtilitiesBase.js");
const fV7 = require("./functions/functionsV7.js");
const verifyDsV7 = require("../verification/versions/verificationV7.js");

/**
 * A DsUtilities instance that offers an API for DS-V7
 * @class
 */
class DsUtilitiesV7 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "7.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV7.getDsRootNodeV7;
    this.getDsStandardContext = fV7.getDsStandardContextV7;
    this.getDsId = fV7.getDsIdV7;
    this.reorderDs = fV7.reorderDsV7;
    this.reorderDsNode = fV7.reorderDsNodeV7;
    this.generateInnerNodeId = fV7.generateInnerNodeIdV7;
    this.getDataTypeLabel = fV7.getDataTypeLabelV7;
    this.getDsDataTypeForSchemaDataType = fV7.getDsDataTypeForSchemaDataTypeV7;
    this.getSchemaDataTypeForDsDataType = fV7.getSchemaDataTypeForDsDataTypeV7;
    this.identifyDsGrammarNodeType = fV7.identifyDsGrammarNodeTypeV7;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    this.dsPathInit = fV7.dsPathInitV7;
    this.dsPathAddition = fV7.dsPathAdditionV7;
    this.dsPathGetNode = fV7.dsPathGetNodeV7;
    this.dsPathIdentifyNodeType = fV7.dsPathIdentifyNodeTypeV7; // these are the node type for the ds path
    this.tokenizeDsPath = fV7.tokenizeDsPathV7;
    // functions that ease the UI interaction with DS
    this.getDsName = fV7.getDsNameV7;
    this.getDsDescription = fV7.getDsDescriptionV7;
    this.getDsAuthorName = fV7.getDsAuthorNameV7;
    this.getDsSchemaVersion = fV7.getDsSchemaVersionV7;
    this.getDsVersion = fV7.getDsVersionV7;
    this.getDsExternalVocabularies = fV7.getDsExternalVocabulariesV7;
    this.getDsTargetClasses = fV7.getDsTargetClassesV7;
    // functions for the meta verification
    this.verifyDs = verifyDsV7;
    // other algorithms
    this.checkClassMatch = fV7.checkClassMatchV7;
  }
}

module.exports = DsUtilitiesV7;
