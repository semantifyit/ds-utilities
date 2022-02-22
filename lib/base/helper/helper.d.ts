import { LanguageTaggedString } from "../types/LanguageTaggedString.type";
import { NodeSchema } from "../types/NodeSchema.type";
import { DsNodeGeneric } from "../types/DsGrammarGeneric.type";
export declare function cloneJson<T>(input: T): T;
export declare function getLanguageString(valuesArray: LanguageTaggedString[], language?: string): string | undefined;
export declare function reorderNodeWithSchema(dsNode: DsNodeGeneric, nodeSchema: NodeSchema): void;
export declare function deepEqual(object1: Record<string, any>, object2: Record<string, any>): boolean;
export declare function isObject(val: any): boolean;
//# sourceMappingURL=helper.d.ts.map