import { generateText } from "ai";

import { resolveModel, type ProvidersConfig } from "../providers/index.js";

import { createTimer } from "../telemetry/index.js";

import type { GenerateOptions, GenerateResult } from "./types.js";

export async function generate(
  options: GenerateOptions,
  providers: ProvidersConfig,
): Promise<GenerateResult> {
  const model = resolveModel(options.model, providers);

  const timer = createTimer();

  const result = await generateText({
    model,
    system: options.system,
    prompt: options.prompt,
  });

  return {
    text: result.text,
    model: options.model,

    usage: {
      inputTokens: result.usage.inputTokens ?? null,

      outputTokens: result.usage.outputTokens ?? null,

      totalTokens: result.usage.totalTokens ?? null,
    },

    timing: {
      totalMs: timer.elapsedMs(),
    },
  };
}
