import { pathGrammarNodeTypes as PGN } from "../../data/pathGrammar.data";
import { PathGrammarNodeTypeV7 } from "../../types/PathGrammarV7.type";

/**
 * Initializes a DS Path string, based on the given inputs
 *
 * @param nodeType - the type of the initial token, "RootNode" being the standard. Other possibilities are: "InternalReferenceDefinition", "ExternalReferenceDefinition", "InternalExternalReferenceDefinition"
 * @param nodeId - the id of the node which starts the DS path (e.g. "https://semantify.it/ds/_1hRVOT8Q"). Can be left blank in case of "RootNode".
 * @return {string} - the generated DS Path
 */
export function dsPathInit(
  nodeType: PathGrammarNodeTypeV7 = PGN.root,
  nodeId?: string
): string {
  switch (nodeType) {
    case PGN.root:
      return "$";
    case PGN.defInt:
      return "#" + nodeId?.split("#")[1]; // nodeId = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    case PGN.defExt:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return nodeId!.split("/").pop()!; // nodeId = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
    case PGN.defIntExt:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return nodeId!.split("/").pop()!; // nodeId = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    case PGN.context:
      return "@context";
    default:
      throw new Error("Unknown node type to initialize a DS Path: " + nodeType);
  }
}
