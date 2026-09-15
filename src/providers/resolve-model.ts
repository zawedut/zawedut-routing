import { createGoogleModel } from "./adapters/google.js";

import { createOpenAIModel } from "./adapters/openai.js";

import { createAnthropicModel } from "./adapters/anthropic.js";

import { createTyphoonModel } from "./adapters/typhoon.js";

import type { ProvidersConfig } from "./types.js";

export function resolveModel(model: string, providers: ProvidersConfig) {
  const separatorIndex = model.indexOf("/");

  if (separatorIndex <= 0 || separatorIndex === model.length - 1) {
    throw new Error('Model must use the format "provider/model-id"');
  }

  const providerName = model.slice(0, separatorIndex);

  const modelId = model.slice(separatorIndex + 1);

  switch (providerName) {
    case "google": {
      if (!providers.google) {
        throw new Error("Google provider is not configured");
      }

      return createGoogleModel(modelId, providers.google);
    }

    case "openai": {
      if (!providers.openai) {
        throw new Error("OpenAI provider is not configured");
      }

      return createOpenAIModel(modelId, providers.openai);
    }

    case "anthropic": {
      if (!providers.anthropic) {
        throw new Error("Anthropic provider is not configured");
      }

      return createAnthropicModel(modelId, providers.anthropic);
    }

    case "typhoon": {
      if (!providers.typhoon) {
        throw new Error("Typhoon provider is not configured");
      }

      return createTyphoonModel(modelId, providers.typhoon);
    }

    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
