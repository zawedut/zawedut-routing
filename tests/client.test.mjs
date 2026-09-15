import assert from "node:assert/strict";
import test from "node:test";

import {
  createClient,
} from "zawedut-routing";

test("logs a failed generate request", async () => {
  const ai = createClient({
    providers: {},
  });

  await assert.rejects(
    ai.generate({
      model: "unknown/model",
      prompt: "Hello",
    }),
    /Unsupported provider: unknown/,
  );

  const logs = ai.getLogs();

  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, "error");
  assert.equal(
    logs[0].model,
    "unknown/model",
  );

  assert.equal(
    logs[0].error.message,
    "Unsupported provider: unknown",
  );
});

test("clears logs", async () => {
  const ai = createClient({
    providers: {},
  });

  await assert.rejects(
    ai.generate({
      model: "unknown/model",
      prompt: "Hello",
    }),
  );

  assert.equal(ai.getLogs().length, 1);

  ai.clearLogs();

  assert.equal(ai.getLogs().length, 0);
});

test("exports logs as JSON", async () => {
  const ai = createClient({
    providers: {},
  });

  await assert.rejects(
    ai.generate({
      model: "unknown/model",
      prompt: "Hello",
    }),
  );

  const json = ai.exportLogs();
  const logs = JSON.parse(json);

  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, "error");
  assert.equal(
    logs[0].model,
    "unknown/model",
  );
});