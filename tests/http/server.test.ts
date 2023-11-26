import { describe, expect, it } from "bun:test";
import request from "supertest";
import { app } from "../utils/create-app.ts";

describe("GET /", () => {
  it("responds with 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(200);
  });
});
