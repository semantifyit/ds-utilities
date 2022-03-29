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
 * Returns the used DS-Specification version of this DS-Utilities instance, which is `"5.0"`.
 *
 * DS-Utilities instances are always bound to a {@link AvailableVersions | specific DS-Specification version}.
 *
 * @example
 * ```JS
 * const dsSpecificationVersion = myDsUtilitiesV5.getDsUtilitiesVersion();
 * // "5.0"
 * ```
 *
 */
function getDsUtilitiesVersion(): "5.0" {
  return "5.0";
}

/**
 * `DsUtilitiesV5` is a Class that offers an API for [DS-Specification 5.0](https://gitbook.semantify.it/domainspecifications/ds-v5)
 *
 * Instances of this class can be created with following static functions of this library:
 * * {@link getDsUtilitiesForDsSpecVersion | .getDsUtilitiesForDsSpecVersion()}
 * * {@link getDsUtilitiesForDs | .getDsUtilitiesForDs()}
 *
 * Below you can find the **API functions** provided by this class (categorized by functionality).
 *
 * @example
 * ```JS
 * // following DsUtilitiesV5 instance is used in the code examples below
 * const myDsUtilitiesV5 = DsUtil.getDsUtilitiesForDsSpecVersion("5.0");
 * ```
 *
 * @class
 */
export class DsUtilitiesV5 extends DsUtilitiesBase {
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
  getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType;
  /** @category DS-Structure */
  getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType;
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
}
