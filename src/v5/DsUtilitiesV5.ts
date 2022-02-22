import { DsUtilitiesBase } from "../base/DsUtilitiesBase";
import { getDsRootNode } from "./functions/structure/getDsRootNode.fn";
import { getDsStandardContext } from "./functions/structure/getDsStandardContext.fn";
import { getDsId } from "./functions/structure/getDsId.fn";
import { getDsDataTypeForSchemaDataType } from "./functions/structure/getDsDataTypeForSchemaDataType.fn";
import { getSchemaDataTypeForDsDataType } from "./functions/structure/getSchemaDataTypeForDsDataType.fn";
import { getDsDescription } from "./functions/ui/getDsDescription.fn";
import { getDsName } from "./functions/ui/getDsName.fn";
import { getDsAuthorName } from "./functions/ui/getDsAuthorName.fn";
import { getDsSchemaVersion } from "./functions/ui/getDsSchemaVersion.fn";
import { getDsVersion } from "./functions/ui/getDsVersion.fn";
import { getDsExternalVocabularies } from "./functions/ui/getDsExternalVocabularies.fn";
import { getDsTargetClasses } from "./functions/ui/getDsTargetClasses.fn";

/**
 * A DsUtilities instance that offers an API for DS-V5
 * @class
 */
export class DsUtilitiesV5 extends DsUtilitiesBase {
  protected dsUtilitiesVersion = "5.0";

  constructor() {
    super();
  }

  /*
  functions that handle the structure of DS
  */
  getDsRootNode = getDsRootNode;
  getDsStandardContext = getDsStandardContext;
  getDsId = getDsId;
  getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;
  getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;
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
}