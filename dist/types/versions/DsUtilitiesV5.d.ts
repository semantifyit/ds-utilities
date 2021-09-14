export = DsUtilitiesV5;
declare class DsUtilitiesV5 extends DsUtilitiesBase {
    getDsRootNode: (ds: any) => any;
    getDsStandardContext: any;
    getDsId: any;
    reorderDsNode: any;
    getDsNodeForPath: any;
    getDsName: any;
    getDsDescription: any;
    getDsAuthorName: any;
    getDsSchemaVersion: any;
    getDsVersion: any;
    getDsExternalVocabularies: any;
    getDsTargetClasses: any;
}
import DsUtilitiesBase = require("./DsUtilitiesBase.js");
