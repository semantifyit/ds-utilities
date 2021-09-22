export = DsUtilitiesV7;
/**
 * A DsUtilities instance that offers an API for DS-V7
 * @class
 */
declare class DsUtilitiesV7 extends DsUtilitiesBase {
    getDsRootNode: (ds: any) => any;
    getDsStandardContext: () => any;
    getDsId: (ds: any) => string;
    generateInnerNodeId: (ds?: any) => string;
    getDsName: (ds: any, language?: string) => string;
    getDsDescription: (ds: any, language?: string) => string;
    getDsAuthorName: (ds: any) => string;
    getDsSchemaVersion: (ds: any) => string;
    getDsVersion: (ds: any) => string;
    getDsExternalVocabularies: (ds: any) => string[];
    getDsTargetClasses: (ds: any) => string[];
}
import DsUtilitiesBase = require("./DsUtilitiesBase.js");
