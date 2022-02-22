"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dsGrammarNodeTypes = void 0;
const dsGrammarNodeTypeDs = "DomainSpecification";
const dsGrammarNodeTypeContext = "Context";
const dsGrammarNodeTypeRoot = "RootNode";
const dsGrammarNodeTypeClass = "Class";
const dsGrammarNodeTypeEnumeration = "Enumeration";
const dsGrammarNodeTypeProperty = "Property";
const dsGrammarNodeTypeDataType = "DataType";
const dsGrammarNodeTypeEnumerationMember = "EnumerationMember";
exports.dsGrammarNodeTypes = {
    ds: dsGrammarNodeTypeDs,
    context: dsGrammarNodeTypeContext,
    root: dsGrammarNodeTypeRoot,
    class: dsGrammarNodeTypeClass,
    enumeration: dsGrammarNodeTypeEnumeration,
    property: dsGrammarNodeTypeProperty,
    dataType: dsGrammarNodeTypeDataType,
    enumerationMember: dsGrammarNodeTypeEnumerationMember,
};
const nodeTermsDsObject = [
    {
        term: "@context",
        required: true,
        valueType: "object",
    },
    {
        term: "@graph",
        required: true,
        valueType: "array",
    },
    {
        term: "@id",
        required: true,
        valueType: "string",
    },
];
const dsNodePropertyOrder = [
    "@context",
    "@graph",
    "@id",
    "@type",
    "@language",
    "@value",
    "sh:targetClass",
    "sh:targetObjectsOf",
    "sh:targetSubjectsOf",
    "sh:class",
    "sh:datatype",
    "schema:name",
    "schema:description",
    "schema:author",
    "rdfs:comment",
    "schema:version",
    "schema:schemaVersion",
    "ds:usedVocabularies",
    "sh:closed",
    "sh:order",
    "sh:path",
    "sh:minCount",
    "sh:maxCount",
    "sh:equals",
    "sh:disjoint",
    "sh:lessThan",
    "sh:lessThanOrEquals",
    "sh:defaultValue",
    "ds:defaultLanguage",
    "sh:minExclusive",
    "sh:minInclusive",
    "sh:maxExclusive",
    "sh:maxInclusive",
    "sh:minLength",
    "sh:maxLength",
    "sh:pattern",
    "sh:flag",
    "sh:languageIn",
    "ds:hasLanguage",
    "sh:uniqueLang",
    "sh:in",
    "sh:hasValue",
    "sh:property",
    "sh:or",
    "sh:node",
];
//# sourceMappingURL=dsGrammar.data.js.map