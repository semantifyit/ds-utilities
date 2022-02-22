"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsSpecificationVersion = void 0;
function getDsSpecificationVersion(ds) {
    if (!Array.isArray(ds["@graph"])) {
        throw new Error("The given DS has no @graph array, which is expected for any DS version.");
    }
    try {
        const rootNode = ds["@graph"].find((el) => el["@type"] === "ds:DomainSpecification");
        if (rootNode) {
            return rootNode["ds:version"];
        }
    }
    catch (e) {
    }
    try {
        const rootNode = ds["@graph"].find((el) => Array.isArray(el["@type"]) &&
            el["@type"].includes("sh:NodeShape") &&
            el["@type"].includes("schema:CreativeWork"));
        if (rootNode) {
            return "5.0";
        }
    }
    catch (e) {
    }
    throw new Error("The DS specification version for the given DS could not been determined - the DS has an unexpected structure.");
}
exports.getDsSpecificationVersion = getDsSpecificationVersion;
//# sourceMappingURL=getDsSpecificationVersion.fn.js.map