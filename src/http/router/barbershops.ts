import { Router } from "express";
import { createBarbershop, updateBarbershop } from "~/http/controllers/barbershops.controller";
import { requireAuth } from "~/http/middleware/require-auth";

export const barbershopsRouter = Router();

barbershopsRouter.post("/", requireAuth, createBarbershop);
barbershopsRouter.patch("/:id", requireAuth, updateBarbershop);
