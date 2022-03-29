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

export { DataTypeDsV7 } from "./types/DataTypesV7.type"; // re-exporting only for documentation
export { DataTypeSchemaV7 } from "./types/DataTypesV7.type"; // re-exporting only for documentation
export { VerificationReportV7 } from "./types/VerificationV7.type"; // re-exporting only for documentation
export { PathTokenObjectV7 } from "./types/PathGrammarV7.type"; // re-exporting only for documentation

/**
 * Returns the used DS-Specification version of this DS-Utilities instance, which is `"7.0"`.
 *
 * DS-Utilities instances are always bound to a {@link AvailableVersions | specific DS-Specification version}.
 *
 * @example
 * ```JS
 * const dsSpecificationVersion = myDsUtilitiesV7.getDsUtilitiesVersion();
 * // "7.0"
 * ```
 *
 */
function getDsUtilitiesVersion(): "7.0" {
  return "7.0";
}

/**
 * `DsUtilitiesV7` is a Class that offers an API for [DS-Specification 7.0](https://gitbook.semantify.it/domainspecifications/ds-v7)
 *
 * Instances of this class can be created with following static functions of this library:
 * * {@link getDsUtilitiesForDsSpecVersion | .getDsUtilitiesForDsSpecVersion()}
 * * {@link getDsUtilitiesForDs | .getDsUtilitiesForDs()}
 *
 * Below you can find the **API functions** provided by this class (categorized by functionality).
 *
 * @example
 * ```JS
 * // following DsUtilitiesV7 instance is used in the code examples below
 * const myDsUtilitiesV7 = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
 * ```
 *
 * @class
 */
export class DsUtilitiesV7 extends DsUtilitiesBase {
  /** @ignore */
  constructor() {
    super();
  }

  /** @category General */
  getDsUtilitiesVersion = getDsUtilitiesVersion;

  /*
  functions that handle the structure of DS
  */
  /** @category DS-Structure */
  getDsRootNode = getDsRootNode;
  /** @category DS-Structure */
  getDsStandardContext = getDsStandardContext;
  /** @category DS-Structure */
  getDsId = getDsId;
  /** @category DS-Structure */
  reorderDs = reorderDs;
  /** @category DS-Structure */
  reorderDsNode = reorderDsNode;
  /** @category DS-Structure */
  generateInnerNodeId = generateInnerNodeId;
  /** @category DS-Structure */
  getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;
  /** @category DS-Structure */
  getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;
  /** @category DS-Structure */
  identifyDsGrammarNodeType = identifyDsGrammarNodeType;

  /*
  functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
  */
  /** @category DS-Path */
  dsPathInit = dsPathInit;
  /** @category DS-Path */
  dsPathAddition = dsPathAddition;
  /** @category DS-Path */
  dsPathGetNode = dsPathGetNode;
  /** @category DS-Path */
  dsPathIdentifyNodeType = dsPathIdentifyNodeType;
  /** @category DS-Path */
  tokenizeDsPath = tokenizeDsPath;

  /*
  functions that ease the UI interaction with DS
  */
  /** @category UI-Interaction */
  getDsName = getDsName;
  /** @category UI-Interaction */
  getDsDescription = getDsDescription;
  /** @category UI-Interaction */
  getDsAuthorName = getDsAuthorName;
  /** @category UI-Interaction */
  getDsSchemaVersion = getDsSchemaVersion;
  /** @category UI-Interaction */
  getDsVersion = getDsVersion;
  /** @category UI-Interaction */
  getDsExternalVocabularies = getDsExternalVocabularies;
  /** @category UI-Interaction */
  getDsTargetClasses = getDsTargetClasses;
  /** @category UI-Interaction */
  getDataTypeLabel = getDataTypeLabel;

  /*
  functions for the verification
  */
  /** @category Verification */
  verifyDs = verifyDs;
  /** @category Verification */
  checkClassMatch = checkClassMatch;
}
