import type { Response } from "express";
import type { AuthenticatedRequest } from "~/http/middleware/require-auth";
import { BarbershopModel } from "~/modules/barbershops/barbershop.model";

export async function createBarbershop(req: AuthenticatedRequest, res: Response) {
  try {
    const { name, geo, costRange, availableHours } = req.body ?? {};

    if (!name || !geo || !costRange) {
      return res.status(400).json({ message: "name, geo, and costRange are required" });
    }

    const ownerId = req.userId ?? null;

    const created = await BarbershopModel.create({
      name,
      geo,
      costRange,
      availableHours: availableHours ?? [],
      ownerId,
    });

    return res.status(201).json(created);
  } catch (error: any) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateBarbershop(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id param is required" });

    const update = req.body ?? {};

    const doc = await BarbershopModel.findById(id);
    if (!doc) return res.status(404).json({ message: "Barbershop not found" });
    doc.set(update);
    const updated = await doc.save();
    if (!updated) return res.status(404).json({ message: "Barbershop not found" });

    return res.status(200).json(updated);
  } catch (error: any) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getBarbershops(req: AuthenticatedRequest, res: Response) {
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = parseInt((req.query.limit as string) || "20", 10);
  if (isNaN(page) || page < 1) {
    return res.status(400).json({ message: "page must be a positive integer" });
  }
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({ message: "limit must be a positive integer between 1 and 100" });
  }
  try {
    const barbershops = await BarbershopModel.where({})
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return res.status(200).json(barbershops);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
