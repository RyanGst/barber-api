import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import { app } from "../../../utils/create-app.ts";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { BarbershopModel } from "~/modules/barbershops/barbershop.model";

let mongod: MongoMemoryServer;

async function setAuth(req: request.Test) {
  return req.set("X-Test-User-Id", "test-user");
}

describe("barbershops endpoints", () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it("should create a barbershop", async () => {
    const body = {
      name: "Downtown Cuts",
      geo: { type: "Point", coordinates: [-122.4194, 37.7749] },
      costRange: { min: 15, max: 45 },
      availableHours: [{ dayOfWeek: 1, open: "09:00", close: "17:00" }],
    };

    const response = await setAuth(request(app).post("/api/barbershops").send(body));

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: body.name,
      costRange: body.costRange,
      availableHours: expect.any(Array),
    });

    const doc = await BarbershopModel.findOne({ name: body.name });
    expect(doc).toBeTruthy();
    expect(doc?.ownerId).toBe("test-user");
  });

  it("should validate required fields", async () => {
    const response = await setAuth(request(app).post("/api/barbershops").send({}));
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ message: expect.any(String) });
  });

  it("should update a barbershop", async () => {
    const created = await BarbershopModel.create({
      name: "Uptown Cuts",
      geo: { type: "Point", coordinates: [-73.935242, 40.73061] },
      costRange: { min: 20, max: 50 },
      availableHours: [],
      ownerId: "test-user",
    });

    const response = await setAuth(
      request(app)
        .patch(`/api/barbershops/${created._id}`)
        .send({ name: "Uptown Cuts & Shaves", costRange: { min: 25, max: 60 } })
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: "Uptown Cuts & Shaves", costRange: { min: 25, max: 60 } });

    const updated = await BarbershopModel.findById(created._id);
    expect(updated?.name).toBe("Uptown Cuts & Shaves");
  });
});
