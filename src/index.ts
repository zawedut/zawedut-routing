export { createClient } from "./client/index.js";

export { generate } from "./generate/index.js";

export type {
  ClientConfig,
  ClientDefaults,
  ClientGenerateOptions,
  ZawedutClient,
} from "./client/index.js";

export type { GenerateOptions, GenerateResult } from "./generate/index.js";

export type {
  ProviderConfig,
  OpenAICompatibleConfig,
  ProvidersConfig,
} from "./providers/index.js";

export type { TokenUsage, Timing } from "./telemetry/index.js";

export { calculateCost, MODEL_PRICING } from "./cost/index.js";

export type {
  Currency,
  ModelPricing,
  PricingTable,
  CalculateCostOptions,
  CostResult,
} from "./cost/index.js";

export { createLog, createErrorLog } from "./logging/index.js";

export type {
  LogStatus,
  LogError,
  CreateLogOptions,
  CreateErrorLogOptions,
  RequestLog,
} from "./logging/index.js";

export { compare } from "./compare/index.js";

export type {
  CompareOptions,
  CompareError,
  CompareSuccess,
  CompareFailure,
  CompareResult,
} from "./compare/index.js";
