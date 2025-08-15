import { toNodeHandler } from "better-auth/node";
import express, { Router } from "express";
import { healthController } from "~/http/controllers/health/health-controller.ts";
import { barbershopsRouter } from "~/http/router/barbershops";
import { connectToDatabase } from "~/database/mongoose";
import { authClient } from "~/modules/auth/auth";

export const routes = () => {
  const router = Router();

  router.all("/api/auth/*", toNodeHandler(authClient))

  router.use(express.json());
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.get("/health", healthController);
  router.use("/api/barbershops", barbershopsRouter);
  return router;
};
