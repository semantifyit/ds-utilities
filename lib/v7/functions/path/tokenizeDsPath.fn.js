"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeDsPath = void 0;
const dsPathGetNode_fn_1 = require("./dsPathGetNode.fn");
const identifyDsGrammarNodeType_fn_1 = require("../structure/identifyDsGrammarNodeType.fn");
const dsPathIdentifyNodeType_fn_1 = require("./dsPathIdentifyNodeType.fn");
const prettyPrintCompactedIRIs_fn_1 = require("../../../base/functions/prettyPrintCompactedIRIs.fn");
const pathGrammar_data_1 = require("../../data/pathGrammar.data");
const getDataTypeLabel_fn_1 = require("../ui/getDataTypeLabel.fn");
function tokenizeDsPath(ds, dsPath) {
    let currentPath = "";
    let restPath = dsPath;
    let result = [];
    while (restPath !== "") {
        let currentToken;
        if (restPath === dsPath && restPath.startsWith("$")) {
            currentToken = "$";
        }
        else if (restPath === dsPath && restPath.startsWith("@context")) {
            currentToken = "@context";
        }
        else if (restPath === dsPath && restPath.startsWith("#")) {
            let limiter = restPath.indexOf(".");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else if (restPath === dsPath &&
            !dsPath.startsWith("#") &&
            !dsPath.startsWith("@") &&
            !dsPath.startsWith("$")) {
            let limiter = restPath.indexOf(".");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else if (restPath.startsWith(".")) {
            let limiter = restPath.indexOf("/");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else if (restPath.startsWith("/")) {
            let limiter = restPath.indexOf(".");
            currentToken = restPath.substring(0, limiter !== -1 ? limiter : undefined);
        }
        else {
            throw new Error("Could not find a valid token match for '" + restPath + "'.");
        }
        currentPath = currentPath + currentToken;
        restPath = restPath.substring(currentToken.length);
        result.push(createDsPathToken(ds, currentToken, currentPath, restPath));
    }
    return result;
}
exports.tokenizeDsPath = tokenizeDsPath;
function createDsPathToken(ds, token, currentPath, restPath) {
    const dsNodeResolvedReference = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, currentPath, true);
    const dsNodeUnresolvedReference = (0, dsPathGetNode_fn_1.dsPathGetNode)(ds, currentPath, false);
    const grammarNodeType = (0, identifyDsGrammarNodeType_fn_1.identifyDsGrammarNodeType)(dsNodeResolvedReference, ds);
    const dsPathNodeType = (0, dsPathIdentifyNodeType_fn_1.dsPathIdentifyNodeType)(dsNodeUnresolvedReference, ds);
    let label;
    if (token === "@context") {
        label = "@context";
    }
    else if (dsPathNodeType === pathGrammar_data_1.pathGrammarNodeTypes.property) {
        label = (0, prettyPrintCompactedIRIs_fn_1.prettyPrintCompactedIRIs)(dsNodeResolvedReference["sh:path"]);
    }
    else if (dsPathNodeType === pathGrammar_data_1.pathGrammarNodeTypes.dataType) {
        label = (0, getDataTypeLabel_fn_1.getDataTypeLabel)(dsNodeResolvedReference["sh:datatype"]);
    }
    else {
        label = (0, prettyPrintCompactedIRIs_fn_1.prettyPrintCompactedIRIs)(dsNodeResolvedReference["sh:class"]);
    }
    return {
        token,
        label,
        grammarNodeType,
        dsPathNodeType,
        currentPath,
        restPath
    };
}
//# sourceMappingURL=tokenizeDsPath.fn.js.map