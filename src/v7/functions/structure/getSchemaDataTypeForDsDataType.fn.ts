import { dataTypeMapping } from "../../data/datatypes.data";
import { DataTypeDsV7, DataTypeSchemaV7 } from "../../types/DataTypesV7.type";

/**
 * Returns the corresponding schema.org datatype (XSD/RDF) for a given DS-V7 datatype, according to the [DsV7-DataType-Mapping](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/datatype#3.1.-datatype-mapping).
 *
 * @example
 * ```JS
 * const schemaDataType = myDsUtilitiesV7.getSchemaDataTypeForDsDataType("xsd:anyURI");
 * // "schema:URL"
 * ```
 *
 * @param dsDataType - a compacted IRI representing a DataType of DS-V7 (from XSD or RDF, e.g. `xsd:string` or `rdf:langString`)
 * @return The corresponding schema.org Datatype, e.g. `schema:URL`
 */
export function getSchemaDataTypeForDsDataType(
  dsDataType: DataTypeDsV7
): DataTypeSchemaV7 {
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
