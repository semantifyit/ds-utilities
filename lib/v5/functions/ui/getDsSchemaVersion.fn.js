"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsSchemaVersion = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
const extractSdoVersionNumber_fn_1 = require("../../../base/functions/extractSdoVersionNumber.fn");
function getDsSchemaVersion(ds) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    if (!rootNode["schema:schemaVersion"]) {
        throw new Error("The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format.");
    }
    return (0, extractSdoVersionNumber_fn_1.extractSdoVersionNumber)(rootNode["schema:schemaVersion"]);
}
exports.getDsSchemaVersion = getDsSchemaVersion;
//# sourceMappingURL=getDsSchemaVersion.fn.js.map