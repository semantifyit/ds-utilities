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
export declare class DsUtilitiesV5 extends DsUtilitiesBase {
    protected dsUtilitiesVersion: string;
    constructor();
    getDsRootNode: typeof getDsRootNode;
    getDsStandardContext: typeof getDsStandardContext;
    getDsId: typeof getDsId;
    getDsDataTypeForSchemaDataType: typeof getDsDataTypeForSchemaDataType;
    getSchemaDataTypeForDsDataType: typeof getSchemaDataTypeForDsDataType;
    getDsName: typeof getDsName;
    getDsDescription: typeof getDsDescription;
    getDsAuthorName: typeof getDsAuthorName;
    getDsSchemaVersion: typeof getDsSchemaVersion;
    getDsVersion: typeof getDsVersion;
    getDsExternalVocabularies: typeof getDsExternalVocabularies;
    getDsTargetClasses: typeof getDsTargetClasses;
}
//# sourceMappingURL=DsUtilitiesV5.d.ts.map