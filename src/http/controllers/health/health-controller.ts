import { type Request, type Response } from "express";
import { getAppHealth } from "~/modules/health/get-app-health.ts";
export const healthController = (req: Request, res: Response) => {
  const health = getAppHealth();
  res.json(health);
};
