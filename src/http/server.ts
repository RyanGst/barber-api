import express from "express";
import { type AddressInfo } from "ws";
import type * as http from 'http';
import { type ILogger } from "~/domain/logger/ILogger";

export class Server {
  private readonly express: express.Application;
  private http!: http.Server;

  constructor(
    private router: express.Router,
    private logger: ILogger,
  ) {
    this.express = express();
    this.express.use(this.logger.stream());
    this.express.use(this.router);
  }

  public start = async (): Promise<void> => {
    return await new Promise<void>((resolve) => {
      this.http = this.express.listen(Bun.env.PORT, () => {
        const { port } = this.http.address() as AddressInfo;
        this.logger.info(`🚀 Application ${process.env.APP_NAME} running on PORT ${port}`);
        resolve();
      });
    });
  };

  public stop = async (): Promise<void> => {
    this.logger.info('Stopping http server...');
    this.http.close();
  };

  public invoke = (): express.Application => this.express;
}