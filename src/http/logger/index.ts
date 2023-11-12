import morgan from "morgan";
import { createLogger, format, transports, type Logger } from "winston";
import { type ILogger } from "~/domain/logger/ILogger";
import { getLoggerOptions } from "./get-logger-options";
import { type Handler } from "express";

export class ServerLogger implements ILogger {
  private logger!: Logger;

  constructor() {
    this.setup();
  }

  private async setup() {
    const options = await getLoggerOptions();

    const loggerTransports = {
      console: new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      info: new transports.File(options.infofile),
      error: new transports.File(options.errorfile),
    };

    this.logger = createLogger({
      level: Bun.env.APP_LOG_LEVEL || "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [loggerTransports.console, loggerTransports.info, loggerTransports.error],
      exitOnError: false,
    });
  }

  public stream(): Handler {
    return morgan("combined", {
      stream: {
        write: (message: string): void => {
          this.info(message.trim());
        },
      },
    });
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public critical(message: string): void {
    this.logger.crit(message);
  }
}
