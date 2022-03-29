import { dataTypeMapping } from "../../data/datatypes.data";
import { DataTypeDsV7, DataTypeSchemaV7 } from "../../types/DataTypesV7.type";

/**
 * Returns the corresponding DS-V7 datatype (XSD/RDF) for a given schema.org datatype, according to the [DsV7-DataType-Mapping](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/datatype#3.1.-datatype-mapping).
 *
 * ATTENTION: for `schema:Text` the value `xsd:string` is always returned (no `rdf:langString` or `rdf:HTML`)
 *
 * @example
 * ```JS
 * const dsDataType = myDsUtilitiesV7.getDsDataTypeForSchemaDataType("schema:URL");
 * // "xsd:anyURI"
 * ```
 *
 * @param schemaDataType - a compacted IRI representing a DataType of schema.org (e.g. `schema:Text`)
 * @return the corresponding DS-V7 Datatype (from XSD or RDF)
 */
export function getDsDataTypeForSchemaDataType(
  schemaDataType: DataTypeSchemaV7
): DataTypeDsV7 {
  const match = (Object.keys(dataTypeMapping) as DataTypeDsV7[]).find((el) => {
    return dataTypeMapping[el] === schemaDataType;
  });
  if (!match) {
    throw new Error(
      "Given input '" +
        schemaDataType +
        "' is not a valid schema.org datatype in DS-V7."
    );
  }
  return match;
}
