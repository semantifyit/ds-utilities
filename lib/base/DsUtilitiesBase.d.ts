import { getDsSpecificationVersion } from "./functions/getDsSpecificationVersion.fn";
import { prettyPrintCompactedIRIs } from "./functions/prettyPrintCompactedIRIs.fn";
import { extractSdoVersionNumber } from "./functions/extractSdoVersionNumber.fn";
export declare abstract class DsUtilitiesBase {
    protected abstract dsUtilitiesVersion: string;
    protected constructor();
    getDsUtilitiesVersion(): string;
    abstract getDsRootNode: Function;
    abstract getDsStandardContext: Function;
    abstract getDsId: Function;
    getDsSpecificationVersion: typeof getDsSpecificationVersion;
    prettyPrintCompactedIRIs: typeof prettyPrintCompactedIRIs;
    extractSdoVersionNumber: typeof extractSdoVersionNumber;
    abstract getDsName: Function;
    abstract getDsDescription: Function;
    abstract getDsAuthorName: Function;
    abstract getDsSchemaVersion: Function;
    abstract getDsVersion: Function;
    abstract getDsExternalVocabularies: Function;
    abstract getDsTargetClasses: Function;
}
//# sourceMappingURL=DsUtilitiesBase.d.ts.map