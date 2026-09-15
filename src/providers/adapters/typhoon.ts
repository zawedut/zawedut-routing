import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

import type { OpenAICompatibleConfig } from "../types.js";

const DEFAULT_TYPHOON_BASE_URL = "https://api.opentyphoon.ai/v1";

export function createTyphoonModel(
  modelId: string,
  config: OpenAICompatibleConfig,
) {
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error("Typhoon API key is required");
  }

  const typhoon = createOpenAICompatible({
    name: "typhoon",
    apiKey,
    baseURL: config.baseURL?.trim() || DEFAULT_TYPHOON_BASE_URL,
  });

  return typhoon(modelId);
}
