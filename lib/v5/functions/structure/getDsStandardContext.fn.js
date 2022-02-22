"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsStandardContext = void 0;
const standardContext_data_1 = require("../../data/standardContext.data");
const helper_1 = require("../../../base/helper/helper");
function getDsStandardContext() {
    return (0, helper_1.cloneJson)(standardContext_data_1.standardContext);
}
exports.getDsStandardContext = getDsStandardContext;
//# sourceMappingURL=getDsStandardContext.fn.js.map