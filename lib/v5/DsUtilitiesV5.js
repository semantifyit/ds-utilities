"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsUtilitiesV5 = void 0;
const DsUtilitiesBase_1 = require("../base/DsUtilitiesBase");
const getDsRootNode_fn_1 = require("./functions/structure/getDsRootNode.fn");
const getDsStandardContext_fn_1 = require("./functions/structure/getDsStandardContext.fn");
const getDsId_fn_1 = require("./functions/structure/getDsId.fn");
const getDsDataTypeForSchemaDataType_fn_1 = require("./functions/structure/getDsDataTypeForSchemaDataType.fn");
const getSchemaDataTypeForDsDataType_fn_1 = require("./functions/structure/getSchemaDataTypeForDsDataType.fn");
const getDsDescription_fn_1 = require("./functions/ui/getDsDescription.fn");
const getDsName_fn_1 = require("./functions/ui/getDsName.fn");
const getDsAuthorName_fn_1 = require("./functions/ui/getDsAuthorName.fn");
const getDsSchemaVersion_fn_1 = require("./functions/ui/getDsSchemaVersion.fn");
const getDsVersion_fn_1 = require("./functions/ui/getDsVersion.fn");
const getDsExternalVocabularies_fn_1 = require("./functions/ui/getDsExternalVocabularies.fn");
const getDsTargetClasses_fn_1 = require("./functions/ui/getDsTargetClasses.fn");
class DsUtilitiesV5 extends DsUtilitiesBase_1.DsUtilitiesBase {
    constructor() {
        super();
        this.dsUtilitiesVersion = "5.0";
        this.getDsRootNode = getDsRootNode_fn_1.getDsRootNode;
        this.getDsStandardContext = getDsStandardContext_fn_1.getDsStandardContext;
        this.getDsId = getDsId_fn_1.getDsId;
        this.getDsDataTypeForSchemaDataType = getDsDataTypeForSchemaDataType_fn_1.getDsDataTypeForSchemaDataType;
        this.getSchemaDataTypeForDsDataType = getSchemaDataTypeForDsDataType_fn_1.getSchemaDataTypeForDsDataType;
        this.getDsName = getDsName_fn_1.getDsName;
        this.getDsDescription = getDsDescription_fn_1.getDsDescription;
        this.getDsAuthorName = getDsAuthorName_fn_1.getDsAuthorName;
        this.getDsSchemaVersion = getDsSchemaVersion_fn_1.getDsSchemaVersion;
        this.getDsVersion = getDsVersion_fn_1.getDsVersion;
        this.getDsExternalVocabularies = getDsExternalVocabularies_fn_1.getDsExternalVocabularies;
        this.getDsTargetClasses = getDsTargetClasses_fn_1.getDsTargetClasses;
    }
}
exports.DsUtilitiesV5 = DsUtilitiesV5;
//# sourceMappingURL=DsUtilitiesV5.js.map