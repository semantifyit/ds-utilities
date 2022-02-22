import { DsUtilitiesV7 } from "./v7/DsUtilitiesV7";
import { DsGeneric } from "./base/types/DsGrammarGeneric.type";
import { DsUtilitiesV5 } from "./v5/DsUtilitiesV5";
export declare const availableVersions: {
    "7.0": typeof DsUtilitiesV7;
    "5.0": typeof DsUtilitiesV5;
};
declare type availableVersionsType = {
    "7.0": DsUtilitiesV7;
    "5.0": DsUtilitiesV5;
};
export declare function getDsUtilitiesForDsSpecVersion<T extends keyof availableVersionsType>(dsSpecVersion: T): availableVersionsType[T];
export declare function getDsUtilitiesForDs<T extends keyof availableVersionsType>(ds: DsGeneric): availableVersionsType[T];
export {};
//# sourceMappingURL=index.d.ts.map