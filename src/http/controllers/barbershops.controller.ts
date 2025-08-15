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

    const updated = await BarbershopModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Barbershop not found" });

    return res.status(200).json(updated);
  } catch (error: any) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
