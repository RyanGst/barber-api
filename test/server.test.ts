import { describe, expect, it } from "bun:test";
import superTest from "supertest";
import { app } from "~/server.ts";

describe("GET /", () => {
  it("should return 200 OK", async() => {
    const response = await superTest(app).get("/");
    expect(response.status).toBe(200);
  });
});
