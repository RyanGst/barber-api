import { toNodeHandler } from "better-auth/node";
import express, { Router } from "express";
import { healthController } from "~/http/controllers/health/health-controller.ts";
import { authClient } from "~/modules/auth/auth";

export const routes = () => {
  const router = Router();

  router.all("/api/auth/*", toNodeHandler(authClient))

  router.use(express.json());
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.get("/health", healthController);
  return router;
};
