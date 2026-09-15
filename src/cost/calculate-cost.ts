import { MODEL_PRICING } from "./prices.js";

import type { CalculateCostOptions, CostResult } from "./types.js";

const TOKENS_PER_MILLION = 1_000_000;

function calculateTokenCost(
  tokens: number | null,
  pricePerMillionTokens: number,
): number | null {
  if (tokens === null) {
    return null;
  }

  if (!Number.isFinite(tokens) || tokens < 0) {
    throw new Error("Token count must be a non-negative number");
  }

  return (tokens / TOKENS_PER_MILLION) * pricePerMillionTokens;
}

export function calculateCost(options: CalculateCostOptions): CostResult {
  const pricing =
    options.pricing?.[options.model] ?? MODEL_PRICING[options.model];

  if (!pricing) {
    return {
      inputCost: null,
      outputCost: null,
      totalCost: null,
      currency: null,
      pricingFound: false,
      estimated: true,
    };
  }

  if (
    !Number.isFinite(pricing.inputPerMillionTokens) ||
    pricing.inputPerMillionTokens < 0 ||
    !Number.isFinite(pricing.outputPerMillionTokens) ||
    pricing.outputPerMillionTokens < 0
  ) {
    throw new Error(`Invalid pricing for model: ${options.model}`);
  }

  const inputCost = calculateTokenCost(
    options.inputTokens,
    pricing.inputPerMillionTokens,
  );

  const outputCost = calculateTokenCost(
    options.outputTokens,
    pricing.outputPerMillionTokens,
  );

  const totalCost =
    inputCost !== null && outputCost !== null ? inputCost + outputCost : null;

  return {
    inputCost,
    outputCost,
    totalCost,
    currency: pricing.currency,
    pricingFound: true,
    estimated: true,
  };
}
