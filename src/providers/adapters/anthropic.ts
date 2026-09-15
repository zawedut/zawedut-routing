import { createAnthropic } from "@ai-sdk/anthropic";

import type { ProviderConfig } from "../types.js";

export function createAnthropicModel(modelId: string, config: ProviderConfig) {
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error("Anthropic API key is required");
  }

  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(modelId);
}
