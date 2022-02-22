
import { dataTypeMappingToLabel } from "../../data/datatypes.data";
import { DataTypeDsV7 } from "../../types/DataTypesV7.type";

/**
 * Returns a human-readable label for the given DS-DataType (e.g. "xsd:string" -> "Text")
 *
 * @param dsDataType - a compacted IRI representing a DataType of DS-V7 (from XSD or RDF, e.g. "xsd:string" or "rdf:langString")
 * @return a human-readable label for the given DataType
 */
export function getDataTypeLabel(dsDataType: DataTypeDsV7): string {
  const match = dataTypeMappingToLabel[dsDataType];
  if (!match) {
    throw new Error(
      "Given input '" +
      dsDataType +
      "' is not a valid xsd/rdf datatype in DS-V7."
    );
  }
  return match;
}