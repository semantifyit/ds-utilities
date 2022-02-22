"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkClassMatch = void 0;
function checkClassMatch(targetClasses, classesToCheck, sdoAdapter) {
    const superClassesArray = [];
    classesToCheck.map((c) => superClassesArray.push(...[c, ...sdoAdapter.getClass(c).getSuperClasses()]));
    const superClassSet = Array.from(new Set(superClassesArray));
    return targetClasses.every((tc) => superClassSet.includes(tc));
}
exports.checkClassMatch = checkClassMatch;
;
//# sourceMappingURL=checkClassMatch.fn.js.map