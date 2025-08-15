import { mkdir, exists } from "node:fs/promises";

export async function getLogsPath(): Promise<string> {
  const logsPath = Bun.env.LOGS_PATH ?? "./logs";

  if (await exists(logsPath)) {
    return logsPath;
  }

  return (await mkdir(logsPath, { recursive: true }))!;
}
