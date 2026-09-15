import { calculateCost } from "../cost/index.js";

import type { CreateLogOptions, RequestLog } from "./types.js";

function createRequestId(): string {
  return `req_${crypto.randomUUID()}`;
}

export function createLog(options: CreateLogOptions): RequestLog {
  const cost = calculateCost({
    model: options.model,
    inputTokens: options.usage.inputTokens,
    outputTokens: options.usage.outputTokens,
    pricing: options.pricing,
  });

  return {
    id: createRequestId(),
    model: options.model,
    status: options.status ?? "success",

    usage: {
      ...options.usage,
    },

    timing: {
      ...options.timing,
    },

    cost,
    error: options.error ?? null,
    createdAt: new Date().toISOString(),
  };
}
