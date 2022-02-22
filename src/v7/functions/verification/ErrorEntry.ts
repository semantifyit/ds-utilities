import {  ErrorSeverityV7 } from "../../types/VerificationV7.type";

export class ErrorEntry {
  constructor(
    public severity: ErrorSeverityV7,
    public path: string | null,
    public description: string
  ) {
  }
}
