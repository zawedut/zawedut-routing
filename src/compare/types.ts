import type { GenerateResult } from "../generate/index.js";

import type { Timing } from "../telemetry/index.js";

export interface CompareOptions {
  models: string[];
  system?: string;
  prompt: string;
}

export interface CompareFailure {
  status: "error";
  model: string;
  error: CompareError;
  timing: Timing;
}

export interface CompareError {
  name: string;
  message: string;
}

export interface CompareSuccess {
  status: "success";
  model: string;
  result: GenerateResult;
}

export type CompareResult = CompareSuccess | CompareFailure;
