import { createOpenAI } from "@ai-sdk/openai";

import type { ProviderConfig } from "../types.js";

export function createOpenAIModel(modelId: string, config: ProviderConfig) {
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  const openai = createOpenAI({
    apiKey,
  });

  return openai(modelId);
}
