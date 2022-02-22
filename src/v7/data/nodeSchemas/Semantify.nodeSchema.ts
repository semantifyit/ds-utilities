// This file contains the node schemas used in semantify DS - use this schemas for the DS Verification
// (how semantify wants the DS syntax to be, in contrast to the syntax given by the specification)

import { VerificationConfigV7 } from "../../types/VerificationV7.type";

export const semantifyConfig: VerificationConfigV7 = {
  nodeSchemaRoot: [
    {
      term: "sh:targetClass",
      required: true,
      valueType: "array"
    },
    {
      term: "sh:class",
      required: true,
      valueType: "array"
    },
    {
      term: "schema:name",
      required: true,
      valueType: "array"
    },
    {
      term: "schema:author",
      required: true,
      valueType: "object"
    },
    {
      term: "schema:version",
      required: true,
      valueType: "string"
    },
    {
      term: "sh:closed",
      required: true,
      valueType: "boolean"
    }
  ],
  nodeSchemaClass: [
    {
      term: "sh:closed",
      required: true,
      valueType: "boolean"
    }
  ]
};
