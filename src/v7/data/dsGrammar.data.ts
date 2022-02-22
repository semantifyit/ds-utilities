const dsGrammarNodeTypeDs = "DomainSpecification";
const dsGrammarNodeTypeContext = "Context";
const dsGrammarNodeTypeRoot = "RootNode"; // root node
const dsGrammarNodeTypeClassStandard = "StandardClass"; // has no sh:property
const dsGrammarNodeTypeClassRestricted = "RestrictedClass"; // has sh:property
const dsGrammarNodeTypeEnumerationStandard = "StandardEnumeration"; // has no sh:in
const dsGrammarNodeTypeEnumerationRestricted = "RestrictedEnumeration"; // has sh:in
const dsGrammarNodeTypeProperty = "Property";
const dsGrammarNodeTypeDataType = "DataType";
const dsGrammarNodeTypeEnumerationMember = "EnumerationMember";
const dsGrammarNodeTypeReference = "Reference"; // any reference node that has only @id, excluding EnumerationMember

export const dsGrammarNodeTypes = {
  ds: dsGrammarNodeTypeDs,
  context: dsGrammarNodeTypeContext,
  root:dsGrammarNodeTypeRoot,
  classStandard: dsGrammarNodeTypeClassStandard,
  classRestricted: dsGrammarNodeTypeClassRestricted,
  enumerationStandard: dsGrammarNodeTypeEnumerationStandard,
  enumerationRestricted: dsGrammarNodeTypeEnumerationRestricted,
  property: dsGrammarNodeTypeProperty,
  dataType: dsGrammarNodeTypeDataType,
  enumerationMember: dsGrammarNodeTypeEnumerationMember,
  reference: dsGrammarNodeTypeReference
} as const;