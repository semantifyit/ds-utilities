export = DsUtilitiesV7;
/**
 * A DsUtilities instance that offers an API for DS-V7
 * @class
 */
declare class DsUtilitiesV7 extends DsUtilitiesBase {
    getDsRootNode: (ds: any) => any;
    getDsStandardContext: () => any;
    getDsId: (ds: any) => string;
    reorderDs: (ds: any) => void;
    reorderDsNode: (dsNode: any) => void;
    generateInnerNodeId: (ds?: any) => string;
    getDataTypeLabel: (dsDataType: string) => string;
    getDsDataTypeForSchemaDataType: (schemaDataType: string) => string;
    getSchemaDataTypeForDsDataType: (dsDataType: string) => string;
    identifyDsGrammarNodeType: (dsNode: any, ds: any, sdoAdapter?: any) => string;
    dsPathInit: (nodeType?: string, nodeId?: string) => string;
    dsPathAddition: (dsPath: string, additionType: string, inputForPath?: string | string[]) => string;
    dsPathGetNode: (ds: any, dsPath: string, resolveReference?: boolean) => any;
    dsPathIdentifyNodeType: (dsNode: any, ds: any) => string;
    tokenizeDsPath: (ds: any, dsPath: string) => any[];
    getDsName: (ds: any, language?: string) => string;
    getDsDescription: (ds: any, language?: string) => string;
    getDsAuthorName: (ds: any) => string;
    getDsSchemaVersion: (ds: any) => string;
    getDsVersion: (ds: any) => string;
    getDsExternalVocabularies: (ds: any) => string[];
    getDsTargetClasses: (ds: any) => string[];
    verifyDs: (ds: any, config?: any) => any;
    checkClassMatch: (targetClasses: string[], classesToCheck: string[], sdoAdapter: any) => boolean;
}
import DsUtilitiesBase = require("./DsUtilitiesBase.js");
