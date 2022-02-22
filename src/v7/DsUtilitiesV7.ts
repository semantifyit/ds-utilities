import { DsUtilitiesBase } from "../base/DsUtilitiesBase";
import { getDsId } from "./functions/structure/getDsId.fn";
import { getDsName } from "./functions/ui/getDsName.fn";
import { getDsRootNode } from "./functions/structure/getDsRootNode.fn";
import { getDsStandardContext } from "./functions/structure/getDsStandardContext.fn";
import { getDsDescription } from "./functions/ui/getDsDescription.fn";
import { getDsAuthorName } from "./functions/ui/getDsAuthorName.fn";
import { getDsSchemaVersion } from "./functions/ui/getDsSchemaVersion.fn";
import { getDsVersion } from "./functions/ui/getDsVersion.fn";
import { getDsExternalVocabularies } from "./functions/ui/getDsExternalVocabularies.fn";
import { getDsTargetClasses } from "./functions/ui/getDsTargetClasses.fn";
import { generateInnerNodeId } from "./functions/structure/generateInnerNodeId.fn";
import { reorderDsNode } from "./functions/structure/reorderDsNode.fn";
import { identifyDsGrammarNodeType } from "./functions/structure/identifyDsGrammarNodeType.fn";
import { dsPathGetNode } from "./functions/path/dsPathGetNode.fn";
import { reorderDs } from "./functions/structure/reorderDs.fn";
import { getDataTypeLabel } from "./functions/ui/getDataTypeLabel.fn";
import { getDsDataTypeForSchemaDataType } from "./functions/structure/getDsDataTypeForSchemaDataType.fn";
import { getSchemaDataTypeForDsDataType } from "./functions/structure/getSchemaDataTypeForDsDataType.fn";
import { dsPathInit } from "./functions/path/dsPathInit.fn";
import { dsPathAddition } from "./functions/path/dsPathAddition.fn";
import { dsPathIdentifyNodeType } from "./functions/path/dsPathIdentifyNodeType.fn";
import { tokenizeDsPath } from "./functions/path/tokenizeDsPath.fn";
import { verifyDs } from "./functions/verification/verifyDs.fn";
import { checkClassMatch } from "./functions/verification/checkClassMatch.fn";

/**
 * A DsUtilities instance that offers an API for DS-V7
 * @class
 */
export class DsUtilitiesV7 extends DsUtilitiesBase {
  protected dsUtilitiesVersion = "7.0";

  constructor() {
    super();
  }

  /*
  functions that handle the structure of DS
  */
  getDsRootNode = getDsRootNode;
  getDsStandardContext = getDsStandardContext;
  getDsId = getDsId;
  reorderDs = reorderDs;
  reorderDsNode = reorderDsNode;
  generateInnerNodeId = generateInnerNodeId;
  getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;
  getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;
  identifyDsGrammarNodeType = identifyDsGrammarNodeType;
  /*
  functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
  */
  dsPathInit = dsPathInit;
  dsPathAddition = dsPathAddition;
  dsPathGetNode = dsPathGetNode;
  dsPathIdentifyNodeType = dsPathIdentifyNodeType;
  tokenizeDsPath = tokenizeDsPath;
  /*
  functions that ease the UI interaction with DS
  */
  getDsName = getDsName;
  getDsDescription = getDsDescription;
  getDsAuthorName = getDsAuthorName;
  getDsSchemaVersion = getDsSchemaVersion;
  getDsVersion = getDsVersion;
  getDsExternalVocabularies = getDsExternalVocabularies;
  getDsTargetClasses = getDsTargetClasses;
  getDataTypeLabel = getDataTypeLabel;
  /*
  functions for the verification
  */
  verifyDs = verifyDs;
  checkClassMatch = checkClassMatch;
}
