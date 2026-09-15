import assert from "node:assert/strict";
import test from "node:test";

import {
  createClient,
} from "zawedut-routing";

test("compare keeps results when models fail", async () => {
  const ai = createClient({
    providers: {},
  });

  const results = await ai.compare({
    models: [
      "unknown/model-one",
      "unknown/model-two",
    ],
    prompt: "Hello",
  });

  assert.equal(results.length, 2);
  assert.equal(results[0].status, "error");
  assert.equal(results[1].status, "error");

  assert.equal(
    results[0].model,
    "unknown/model-one",
  );

  assert.equal(
    results[1].model,
    "unknown/model-two",
  );

  assert.equal(ai.getLogs().length, 2);
});

test("compare requires at least one model", async () => {
  const ai = createClient({
    providers: {},
  });

  await assert.rejects(
    ai.compare({
      models: [],
      prompt: "Hello",
    }),
    /At least one model is required/,
  );
});