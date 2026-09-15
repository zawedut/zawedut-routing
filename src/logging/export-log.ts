import type { RequestLog } from "./types.js";

export interface ExportLogsOptions {
  pretty?: boolean;
}

export function exportLogs(
  logs: readonly RequestLog[],
  options: ExportLogsOptions = {},
): string {
  const spaces = options.pretty === false ? undefined : 2;

  return JSON.stringify(logs, null, spaces);
}
