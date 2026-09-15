import type { CompareOptions, CompareResult } from "../compare/index.js";

import type { GenerateOptions, GenerateResult } from "../generate/index.js";

import type { ExportLogsOptions, RequestLog } from "../logging/index.js";

import type { ProvidersConfig } from "../providers/index.js";

import type { PricingTable } from "../cost/index.js";

export interface ClientDefaults {
  model?: string;
  system?: string;
}

export interface ClientConfig {
  providers: ProvidersConfig;
  defaults?: ClientDefaults;
  pricing?: PricingTable;
}

export type ClientGenerateOptions = Omit<GenerateOptions, "model"> & {
  model?: string;
};

export interface ZawedutClient {
  generate(options: ClientGenerateOptions): Promise<GenerateResult>;

  compare(options: CompareOptions): Promise<CompareResult[]>;

  getLogs(): RequestLog[];

  clearLogs(): void;

  exportLogs(options?: ExportLogsOptions): string;
}
