import type { CostResult, PricingTable } from "../cost/index.js";

import type { TokenUsage, Timing } from "../telemetry/index.js";

export type LogStatus = "success" | "error";

export interface LogError {
  name: string;
  message: string;
}

export interface RequestLog {
  id: string;
  model: string;
  status: LogStatus;
  usage: TokenUsage;
  timing: Timing;
  cost: CostResult;
  error: LogError | null;
  createdAt: string;
}

export interface CreateLogOptions {
  model: string;
  usage: TokenUsage;
  timing: Timing;
  pricing?: PricingTable;
  status?: LogStatus;
  error?: LogError | null;
}

export interface CreateErrorLogOptions {
  model: string;
  error: unknown;
  timing: Timing;
  pricing?: PricingTable;
}
