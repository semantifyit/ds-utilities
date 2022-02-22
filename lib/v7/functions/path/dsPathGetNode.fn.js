"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsPathGetNode = void 0;
const getDsRootNode_fn_1 = require("../structure/getDsRootNode.fn");
function dsPathGetNode(ds, dsPath, resolveReference = false) {
    if (dsPath === "@context") {
        if (!ds["@context"]) {
            throw new Error("The given DS has no @context, which is mandatory for a DS in DS-V7 format.");
        }
        return ds["@context"];
    }
    else if (dsPath.startsWith("$")) {
        const dsRoot = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
        if (dsPath === "$") {
            return dsRoot;
        }
        else {
            return getPropertyNode(dsRoot["sh:property"], dsPath.substring(2), ds, resolveReference);
        }
    }
    else {
        const pathTokens = dsPath.split(".");
        const referenceDefinition = ds["@graph"].find((el) => el["@id"].endsWith(pathTokens[0]));
        if (!referenceDefinition) {
            throw new Error("Could not find a fitting reference definition for path-token " +
                pathTokens[0]);
        }
        if (pathTokens.length === 1) {
            return referenceDefinition;
        }
        else {
            return getPropertyNode(referenceDefinition["sh:property"], dsPath.substring(pathTokens[0].length + 1), ds, resolveReference);
        }
    }
}
exports.dsPathGetNode = dsPathGetNode;
function checkClassMatch(arr1, arr2) {
    return (!arr1.find((el) => !arr2.includes(el)) &&
        !arr2.find((el) => !arr1.includes(el)));
}
function getRangeNode(actDsObj, actRestPath, ds, resolveReference) {
    const rootNode = (0, getDsRootNode_fn_1.getDsRootNode)(ds);
    const pathTokens = actRestPath.split(".");
    const rangeToken = pathTokens[0];
    let actRange;
    let referencedNode;
    if (rangeToken.startsWith("@")) {
        if (rangeToken === "@$") {
            actRange = actDsObj.find((el) => el["sh:node"] && el["sh:node"]["@id"] === rootNode["@id"]);
            referencedNode = rootNode;
        }
        else if (rangeToken.startsWith("@#")) {
            actRange = actDsObj.find((el) => el["sh:node"] && el["sh:node"]["@id"] === rootNode["@id"] + rangeToken.substring(1));
            if (actRange) {
                referencedNode = ds["@graph"].find((el) => el["@id"] === actRange["sh:node"]["@id"]);
            }
        }
        else {
            actRange = actDsObj.find((el) => el["sh:node"] && el["sh:node"]["@id"].endsWith(rangeToken.substring(1)));
            if (actRange) {
                referencedNode = ds["@graph"].find((el) => el["@id"] === actRange["sh:node"]["@id"]);
            }
        }
    }
    else {
        actRange = actDsObj.find((el) => el["sh:datatype"] === pathTokens[0] ||
            (el["sh:node"] && el["sh:node"]["sh:class"] &&
                checkClassMatch(el["sh:node"]["sh:class"], pathTokens[0].split(","))) ||
            (el["sh:node"] &&
                el["sh:node"]["@id"].endsWith(pathTokens[0].substring(1))));
    }
    if (!actRange) {
        throw new Error("Could not find a fitting range-node for path-token " + pathTokens[0]);
    }
    if (pathTokens.length === 1) {
        if (resolveReference && referencedNode) {
            return referencedNode;
        }
        else if (actRange["sh:node"]) {
            return actRange["sh:node"];
        }
        else {
            return actRange;
        }
    }
    else {
        if (referencedNode) {
            return getPropertyNode(referencedNode["sh:property"], actRestPath.substring(pathTokens[0].length + 1), ds, resolveReference);
        }
        else {
            return getPropertyNode(actRange["sh:node"]["sh:property"], actRestPath.substring(pathTokens[0].length + 1), ds, resolveReference);
        }
    }
}
function getPropertyNode(actDsObj, actRestPath, ds, resolveReference) {
    const pathTokens = actRestPath.split("/");
    const actProp = actDsObj.find((el) => el["sh:path"] === pathTokens[0]);
    if (!actProp) {
        throw new Error("Could not find a fitting property-node for path-token " + pathTokens[0]);
    }
    if (pathTokens.length === 1) {
        return actProp;
    }
    else {
        return getRangeNode(actProp["sh:or"], actRestPath.substring(pathTokens[0].length + 1), ds, resolveReference);
    }
}
//# sourceMappingURL=dsPathGetNode.fn.js.map