import { generate } from "../generate/index.js";

import type { ProvidersConfig } from "../providers/index.js";

import { createTimer } from "../telemetry/index.js";

import type { CompareError, CompareOptions, CompareResult } from "./types.js";

function normalizeError(error: unknown): CompareError {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return {
    name: "Error",
    message: String(error),
  };
}

async function compareModel(
  model: string,
  options: CompareOptions,
  providers: ProvidersConfig,
): Promise<CompareResult> {
  const timer = createTimer();

  try {
    const result = await generate(
      {
        model,
        system: options.system,
        prompt: options.prompt,
      },
      providers,
    );

    return {
      status: "success",
      model,
      result,
    };
  } catch (error) {
    return {
      status: "error",
      model,
      error: normalizeError(error),

      timing: {
        totalMs: timer.elapsedMs(),
      },
    };
  }
}

export async function compare(
  options: CompareOptions,
  providers: ProvidersConfig,
): Promise<CompareResult[]> {
  if (options.models.length === 0) {
    throw new Error("At least one model is required");
  }

  return Promise.all(
    options.models.map((model) => compareModel(model, options, providers)),
  );
}
