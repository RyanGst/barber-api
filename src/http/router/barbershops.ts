import { Router } from "express";
import { createBarbershop, getBarbershops, updateBarbershop } from "~/http/controllers/barbershops.controller";
import { requireAuth } from "~/http/middleware/require-auth";

export const barbershopsRouter = (app: Router) => {

  app.get("/api/barbershops", getBarbershops);
  app.post("/api/barbershops", requireAuth, createBarbershop);
  app.patch("/api/barbershops/:id", requireAuth, updateBarbershop);

}
