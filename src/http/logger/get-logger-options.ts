import { resolve } from "node:path";
import { getLogsPath } from "./get-logs-path";

export const getLoggerOptions = async () => {
  const path = await getLogsPath();

  const options = {
    infofile: {
      level: "info",
      filename: resolve(path, "info.log"),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    },
    errorfile: {
      level: "error",
      filename: resolve(path, "error.log"),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    },
  };
  return options;
};
