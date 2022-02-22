import { getDsSpecificationVersion } from "./functions/getDsSpecificationVersion.fn";
import { prettyPrintCompactedIRIs } from "./functions/prettyPrintCompactedIRIs.fn";
import { extractSdoVersionNumber } from "./functions/extractSdoVersionNumber.fn";

/**
 * This is the super class for all DsUtilities classes
 * It includes functions that are shared by all DsUtilities classes
 */

export abstract class DsUtilitiesBase {
  // the dsUtilitiesVersion specifies the version of a DsUtilities Class, which is exactly the same as the corresponding DS specification version
  // DsUtilitiesBase is a super-class for all DsUtilities versions, therefore, it has no corresponding Ds specification version
  protected abstract dsUtilitiesVersion: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}

  getDsUtilitiesVersion(): string {
    return this.dsUtilitiesVersion;
  }

  /*
  functions that handle the structure of DS
  */

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsRootNode: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsStandardContext: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getDsId: Function;
  getDsSpecificationVersion = getDsSpecificationVersion;

  /*
  functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
  */

  /*
  functions that ease the UI interaction with DS
  */

  prettyPrintCompactedIRIs = prettyPrintCompactedIRIs;
  extractSdoVersionNumber = extractSdoVersionNumber;
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
