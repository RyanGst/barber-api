import { describe, expect, it, spyOn, jest } from "bun:test";
import request from "supertest";
import { app } from "../../../utils/create-app.ts";

describe("health endpoint", () => {
  const now = Date.now();
  const expectedDate = new Date(now);

  // @ts-ignore
  spyOn(global, "Date").mockImplementation(() => expectedDate);
  Date.now = jest.fn().mockReturnValue(now);

  it("should return 200", async () => {
    const expectedResponse = {
      status: "OK",
      uptime: expect.any(Number),
      timestamp: now,
    };

    const response = await request(app).get("/health");

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(expectedResponse);
  });
});
