import { pathGrammarNodeTypes } from "../data/pathGrammar.data";
import { DsGrammarNodeTypeV7 } from "./DsGrammarV7.type";
export declare type PathGrammarNodeTypeV7 = typeof pathGrammarNodeTypes[keyof typeof pathGrammarNodeTypes];
export declare type PathTokenObject = {
    token: string;
    label: string;
    grammarNodeType: DsGrammarNodeTypeV7;
    dsPathNodeType: PathGrammarNodeTypeV7;
    currentPath: string;
    restPath: string;
};
//# sourceMappingURL=PathGrammarV7.type.d.ts.map