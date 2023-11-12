declare module "bun" {
  interface Env {
    NODE_ENV: string | undefined;
    PORT: number | string;
    APP_NAME: string;
    APP_DATABASE_URL: string;
    APP_LOG_LEVEL: string;
    LOGS_PATH: string;
  }
}
