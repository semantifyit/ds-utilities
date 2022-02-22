import { dataTypeMapping } from "../../data/datatypes.data";
import { DataTypeDsV7, DataTypeSchemaV7 } from "../../types/DataTypesV7.type";

/**
 * Returns the corresponding schema.org datatype for a given DS-V7 datatype (XSD/RDF)
 *
 * @param dsDataType - a compacted IRI representing a DataType of DS-V7 (from XSD or RDF, e.g. "xsd:string" or "rdf:langString")
 * @return the corresponding schema.org Datatype
 */
export function getSchemaDataTypeForDsDataType(dsDataType: DataTypeDsV7): DataTypeSchemaV7 {
  const match = dataTypeMapping[dsDataType];
  if (!match) {
    throw new Error(
      "Given input '" +
      dsDataType +
      "' is not a valid xsd/rdf datatype in DS-V7."
    );
  }
  return match;
}