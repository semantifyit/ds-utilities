import { pathGrammarNodeTypes } from "../data/pathGrammar.data";
import { DsGrammarNodeTypeV7 } from "./DsGrammarV7.type";

export type PathGrammarNodeTypeV7 =
  typeof pathGrammarNodeTypes[keyof typeof pathGrammarNodeTypes];

export type PathTokenObjectV7 = {
  token: string;
  label: string;
  grammarNodeType: DsGrammarNodeTypeV7;
  dsPathNodeType: PathGrammarNodeTypeV7;
  currentPath: string;
  restPath: string;
};
