import assert from "node:assert/strict";
import test from "node:test";

import {
  createErrorLog,
  createLog,
} from "zawedut-routing";

test("creates a success log", () => {
  const log = createLog({
    model: "test/model",

    usage: {
      inputTokens: 1_000,
      outputTokens: 500,
      totalTokens: 1_500,
    },

    timing: {
      totalMs: 250,
    },

    pricing: {
      "test/model": {
        inputPerMillionTokens: 1,
        outputPerMillionTokens: 2,
        currency: "USD",
      },
    },
  });

  assert.match(log.id, /^req_/);
  assert.equal(log.model, "test/model");
  assert.equal(log.status, "success");
  assert.equal(log.error, null);
  assert.equal(log.cost.totalCost, 0.002);
  assert.equal(log.timing.totalMs, 250);
  assert.equal(
    Number.isNaN(Date.parse(log.createdAt)),
    false,
  );
});

test("creates an error log", () => {
  const log = createErrorLog({
    model: "test/model",
    error: new TypeError("Something failed"),

    timing: {
      totalMs: 100,
    },
  });

  assert.equal(log.status, "error");

  assert.deepEqual(log.error, {
    name: "TypeError",
    message: "Something failed",
  });

  assert.deepEqual(log.usage, {
    inputTokens: null,
    outputTokens: null,
    totalTokens: null,
  });
});