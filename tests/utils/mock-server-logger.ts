import { type Handler } from "express";
import { type ILogger } from "~/domain/logger/ILogger.ts";

export class MockServerLogger implements ILogger {
  public debugLogs: string[] = [];
  public infoLogs: string[] = [];
  public errorLogs: string[] = [];
  public criticalLogs: string[] = [];

  constructor() {}

  public stream(): Handler {
    return (req, res, next) => {
      next();
    };
  }

  public debug(message: string): void {
    this.debugLogs.push(message);
  }

  public info(message: string): void {
    this.infoLogs.push(message);
  }

  public error(message: string): void {
    this.errorLogs.push(message);
  }

  public critical(message: string): void {
    this.criticalLogs.push(message);
  }
}
