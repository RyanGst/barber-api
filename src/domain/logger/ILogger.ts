import { type Handler } from "express";

export type ILogger = {
  debug(message: string): void;
  info(message: string): void;
  error(message: string): void;
  critical(message: string): void;
  stream(): Handler;
};
