export = DsUtilitiesV5;
/**
 * A DsUtilities instance that offers an API for DS-V5
 * @class
 */
declare class DsUtilitiesV5 extends DsUtilitiesBase {
    getDsRootNode: (ds: any) => any;
    getDsStandardContext: () => any;
    getDsId: (ds: any) => string;
    getDsName: (ds: any) => string;
    getDsDescription: (ds: any) => string;
    getDsAuthorName: (ds: any) => string;
    getDsSchemaVersion: (ds: any) => string;
    getDsVersion: (ds: any) => string;
    getDsExternalVocabularies: (ds: any) => string[];
    getDsTargetClasses: (ds: any) => string[];
}
import DsUtilitiesBase = require("./DsUtilitiesBase.js");
