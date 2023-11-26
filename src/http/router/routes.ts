import { Router } from "express";
import { getAppHealth } from "~/modules/health/get-app-health";
import { healthController } from "~/http/controllers/health/health-controller.ts";

export const routes = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.get("/health", healthController);
  return router;
};
