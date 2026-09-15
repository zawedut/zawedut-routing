import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateCost,
} from "zawedut-routing";

test("calculates custom pricing", () => {
  const result = calculateCost({
    model: "test/model",
    inputTokens: 1_000,
    outputTokens: 500,

    pricing: {
      "test/model": {
        inputPerMillionTokens: 1,
        outputPerMillionTokens: 2,
        currency: "USD",
      },
    },
  });

  assert.equal(result.inputCost, 0.001);
  assert.equal(result.outputCost, 0.001);
  assert.equal(result.totalCost, 0.002);
  assert.equal(result.currency, "USD");
  assert.equal(result.pricingFound, true);
});

test("returns null when pricing is unknown", () => {
  const result = calculateCost({
    model: "unknown/model",
    inputTokens: 1_000,
    outputTokens: 500,
  });

  assert.equal(result.inputCost, null);
  assert.equal(result.outputCost, null);
  assert.equal(result.totalCost, null);
  assert.equal(result.currency, null);
  assert.equal(result.pricingFound, false);
});

test("rejects negative token counts", () => {
  assert.throws(
    () =>
      calculateCost({
        model: "test/model",
        inputTokens: -1,
        outputTokens: 10,

        pricing: {
          "test/model": {
            inputPerMillionTokens: 1,
            outputPerMillionTokens: 1,
            currency: "USD",
          },
        },
      }),
    /Token count must be/,
  );
});