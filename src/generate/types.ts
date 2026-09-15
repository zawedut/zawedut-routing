import type { TokenUsage, Timing } from "../telemetry/index.js";

export interface GenerateOptions {
  model: string;
  system?: string;
  prompt: string;
}

export interface GenerateResult {
  text: string;
  model: string;
  usage: TokenUsage;
  timing: Timing;
}
