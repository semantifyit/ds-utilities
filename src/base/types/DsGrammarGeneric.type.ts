export type ContextGeneric = Record<string, Record<string, string> | string>;

export type DsNodeGeneric = Record<string, any>;

export type DsGeneric = {
  "@id"?: string,
  "@context": ContextGeneric,
  "@graph": DsNodeGeneric[],
}

