import { pathGrammarNodeTypes as PGN } from "../../data/pathGrammar.data";
import { PathGrammarNodeTypeV7 } from "../../types/PathGrammarV7.type";

/**
 * Initializes a [DS-Path](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/dspath), based on the given input parameter.
 *
 * Keep in mind that paths can only start with a @graph-node (a DS-Node that resides directly in the @graph array of the Domain Specification), the only exception is the @context path. Details about the different reference types can be found in the [DS-V7 Documentation](https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/domainspecification/domainspecification#3.5.-ds-hierarchy).
 *
 * The parameter `nodeType` (default = `"RootNode"`) must be one of the following:
 * * `"RootNode"`: The DS-Path starts at the root node of the Domain Specification, this is the standard.
 * * `"InternalReferenceDefinition"`: The DS-Path starts with an internal reference definition.
 * * `"ExternalReferenceDefinition"`: The DS-Path starts with an external reference definition.
 * * `"InternalExternalReferenceDefinition"`: The DS-Path starts with an internal reference definition of an external reference.
 * * `"Context"`: The DS-Path points to the `@context` of the Domain Specification.
 *
 * The parameter `nodeId` must be used if the DS-Path starts with a reference definition, and the value for this parameter is the `@id` of that reference definition, e.g. `"https://semantify.it/ds/_1hRVOT8Q"`.
 *
 * The newly created DS-Path can be augmented with the function {@link dsPathAddition | dsPathAddition()}.
 *
 * @example
 * ```JS
 * const newDsPath1 = myDsUtilitiesV7.dsPathInit(); // nodeType defaults to "RootNode"
 * // "$"
 * const newDsPath2 = myDsUtilitiesV7.dsPathInit("InternalExternalReferenceDefinition", "https://semantify.it/ds/_1hRVOT8Q#lwioY");
 * // "_1hRVOT8Q#lwioY"
 * ```
 *
 * @param nodeType - the node type of the initial token, defaults to "RootNode"
 * @param nodeId - the id of the node which starts the DS-path. Can be left blank in case of "RootNode" or "Context"
 * @return the generated DS-Path
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
