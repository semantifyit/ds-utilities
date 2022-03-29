const { DsUtil } = require("../../lib");

const testDs = {
  "@context": {
    "ds": "https://vocab.sti2.at/ds/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "schema": "https://schema.org/",
    "sh": "http://www.w3.org/ns/shacl#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "ds:propertyDisplayOrder": {
      "@container": "@list",
      "@type": "@id"
    },
    "ds:subDSOf": {
      "@type": "@id"
    },
    "ds:usedVocabulary": {
      "@type": "@id"
    },
    "sh:targetClass": {
      "@type": "@id"
    },
    "sh:targetObjectsOf": {
      "@type": "@id"
    },
    "sh:targetSubjectsOf": {
      "@type": "@id"
    },
    "sh:class": {
      "@type": "@id"
    },
    "sh:path": {
      "@type": "@id"
    },
    "sh:datatype": {
      "@type": "@id"
    },
    "sh:equals": {
      "@type": "@id"
    },
    "sh:disjoint": {
      "@type": "@id"
    },
    "sh:lessThan": {
      "@type": "@id"
    },
    "sh:lessThanOrEquals": {
      "@type": "@id"
    },
    "sh:in": {
      "@container": "@list"
    },
    "sh:languageIn": {
      "@container": "@list"
    },
    "sh:or": {
      "@container": "@list"
    }
  },
  "@graph": [
    {
      "@id": "https://semantify.it/ds/rsFn_FabM",
      "@type": "ds:DomainSpecification",
      "ds:subDSOf": "https://semantify.it/ds/8gmtfiLfm",
      "sh:targetClass": [
        "schema:Drawing"
      ],
      "sh:class": [
        "schema:Drawing"
      ],
      "schema:name": [
        {
          "@language": "en",
          "@value": "poptest_ds0"
        },
        {
          "@language": "de",
          "@value": "poptest_ds0 deutsch"
        }
      ],
      "schema:description": [
        {
          "@language": "en",
          "@value": "test"
        },
        {
          "@language": "de",
          "@value": "test de"
        }
      ],
      "schema:author": {
        "@type": "schema:Person",
        "schema:name": "omar",
        "schema:memberOf": {
          "@type": "schema:Organization",
          "schema:name": "STI Innsbruck"
        }
      },
      "ds:version": "7.0",
      "schema:version": "1",
      "schema:schemaVersion": "12.0",
      "sh:closed": true,
      "sh:property": [
        {
          "@type": "sh:PropertyShape",
          "sh:order": 4,
          "sh:path": "schema:citation",
          "rdfs:comment": [
            {
              "@language": "en",
              "@value": "own property"
            }
          ],
          "sh:minCount": 1,
          "sh:or": [
            {
              "sh:datatype": "xsd:string"
            }
          ]
        },
        {
          "@type": "sh:PropertyShape",
          "sh:order": 5,
          "sh:path": "schema:dateCreated",
          "rdfs:comment": [
            {
              "@language": "en",
              "@value": "overrides property of SDS2"
            }
          ],
          "sh:minCount": 1,
          "sh:maxCount": 1,
          "sh:or": [
            {
              "sh:datatype": "xsd:dateTime"
            }
          ]
        }
      ]
    }
  ]
};

console.log(DsUtil.getAvailableVersions());
const myDsUtilitiesV5 = DsUtil.getDsUtilitiesForDsSpecVersion("5.0");
console.log(myDsUtilitiesV5.getDsUtilitiesVersion());
console.log(myDsUtilitiesV5.getDsStandardContext());
const myDsUtilitiesV7 = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
console.log(myDsUtilitiesV7.getDsUtilitiesVersion());
console.log(myDsUtilitiesV7.getDsStandardContext());
const myDsUtil = DsUtil.getDsUtilitiesForDs(testDs);
console.log(myDsUtil.getDsUtilitiesVersion());
console.log(myDsUtil.getDsAuthorName(testDs));
