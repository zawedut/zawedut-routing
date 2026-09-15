import { createLog } from "./create-log.js";

import type { CreateErrorLogOptions, LogError, RequestLog } from "./types.js";

function normalizeError(error: unknown): LogError {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  if (typeof error === "object" && error !== null) {
    const record = error as Record<string, unknown>;

    return {
      name: typeof record.name === "string" ? record.name : "Error",

      message:
        typeof record.message === "string" ? record.message : String(error),
    };
  }

  return {
    name: "Error",
    message: String(error),
  };
}

export function createErrorLog(options: CreateErrorLogOptions): RequestLog {
  return createLog({
    model: options.model,

    usage: {
      inputTokens: null,
      outputTokens: null,
      totalTokens: null,
    },

    timing: options.timing,
    pricing: options.pricing,
    status: "error",
    error: normalizeError(options.error),
  });
}
