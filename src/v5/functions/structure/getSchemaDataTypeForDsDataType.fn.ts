import { dataTypeMapping } from "../../data/datatypes.data";
import { DataTypeDsV5, DataTypeSchemaV5 } from "../../types/DataTypesV5.type";

/**
 * Returns the corresponding schema.org datatype for a given DS-V5 datatype (XSD/RDF)
 *
 * @param dsDataType - a compacted IRI representing a DataType of DS-V5 (from XSD or RDF, e.g. "xsd:string")
 * @return the corresponding schema.org Datatype
 */
export function getSchemaDataTypeForDsDataType(
  dsDataType: DataTypeDsV5
): DataTypeSchemaV5 {
  const match = dataTypeMapping[dsDataType];
  if (!match) {
    throw new Error(
      "Given input '" +
        dsDataType +
        "' is not a valid xsd/rdf datatype in DS-V5."
    );
  }
  return match;
}
