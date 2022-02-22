
import { dataTypeMapping } from "../../data/datatypes.data";
import { DataTypeDsV5, DataTypeSchemaV5 } from "../../types/DataTypesV5.type";

/**
 * Returns the corresponding DS-V5 datatype (XSD/RDF) for a given schema.org datatype.
 *
 * @param schemaDataType - a compacted IRI representing a DataType of schema.org (e.g. schema:Text)
 * @return the corresponding DS-V5 Datatype (from XSD or RDF)
 */
export function getDsDataTypeForSchemaDataType(schemaDataType: DataTypeSchemaV5): DataTypeDsV5 {
  const match = (Object.keys(dataTypeMapping) as DataTypeDsV5[]).find((el) => {
    return dataTypeMapping[el] === schemaDataType;
  });
  if (!match) {
    throw new Error(
      "Given input '" +
      schemaDataType +
      "' is not a valid schema.org datatype in DS-V5."
    );
  }
  return match;
}