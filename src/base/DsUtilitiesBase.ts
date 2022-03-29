import { getDsSpecificationVersion } from "./functions/getDsSpecificationVersion.fn";
import { prettyPrintCompactedIRIs } from "./functions/prettyPrintCompactedIRIs.fn";
import { extractSdoVersionNumber } from "./functions/extractSdoVersionNumber.fn";

/**
 *
 * This is the super class for all DS-Utilities classes
 * It includes functions that are shared by all DS-Utilities classes
 */
export abstract class DsUtilitiesBase {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}

  // the dsUtilitiesVersion specifies the version of a DS-Utilities Class, which is exactly the same as the corresponding DS specification version
  // eslint-disable-next-line @typescript-eslint/ban-types
  protected abstract getDsUtilitiesVersion: Function;

  /** @category General */
  getDsSpecificationVersion = getDsSpecificationVersion;
  /** @category General */
  extractSdoVersionNumber = extractSdoVersionNumber;

  /*
  functions that handle the structure of DS
  */

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsRootNode: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsStandardContext: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsId: Function;

  /*
  functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
  */

  /*
  functions that ease the UI interaction with DS
  */

  /** @category UI-Interaction */
  prettyPrintCompactedIRIs = prettyPrintCompactedIRIs;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsName: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsDescription: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsAuthorName: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsSchemaVersion: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsVersion: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsExternalVocabularies: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsTargetClasses: Function;

  /*
 functions for the meta verification
 */
}
