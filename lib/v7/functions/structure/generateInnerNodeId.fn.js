"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInnerNodeId = void 0;
const getDsId_fn_1 = require("./getDsId.fn");
const { customAlphabet } = require("nanoid");
function generateInnerNodeId(ds) {
    let dsId;
    let newId;
    if (ds) {
        dsId = (0, getDsId_fn_1.getDsId)(ds);
    }
    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 5);
    do {
        newId = nanoid();
    } while (ds !== undefined && JSON.stringify(ds).includes(dsId + "#" + newId));
    return newId;
}
exports.generateInnerNodeId = generateInnerNodeId;
//# sourceMappingURL=generateInnerNodeId.fn.js.map