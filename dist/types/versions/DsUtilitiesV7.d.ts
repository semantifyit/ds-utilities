export = DsUtilitiesV7;
declare class DsUtilitiesV7 extends DsUtilitiesBase {
    getDsRootNode: (ds: any) => any;
    getDsStandardContext: () => any;
    getDsId: (ds: any) => string;
    getDsName: (ds: any, language?: string) => string;
    getDsDescription: (ds: any, language?: string) => string;
    getDsAuthorName: (ds: any) => string;
    getDsSchemaVersion: (ds: any) => string;
    getDsVersion: (ds: any) => string;
    getDsExternalVocabularies: (ds: any) => string[];
}
import DsUtilitiesBase = require("./DsUtilitiesBase.js");
