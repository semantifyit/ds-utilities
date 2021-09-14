export = DsUtilitiesBase;
declare class DsUtilitiesBase {
    dsUtilitiesVersion: any;
    getDsSpecificationVersion: (ds: any) => string;
    prettyPrintCompactedIRI: (iri: string | string[]) => string;
    extractSdoVersionNumber: (schemaVersionValue: string) => string;
}
