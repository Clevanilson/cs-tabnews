import { expect, test, describe, vi } from "vitest";
import { FetchAdapter } from "@/http/http-client";
import { BASE_URL } from "@test/support/const/base-url";
import { StatusRes } from "@/types/status.res";

describe("GET /api/v1/status", () => {
  test("With success", async () => {
    const httpClient = new FetchAdapter(BASE_URL);
    const response = await httpClient.get<StatusRes>("/api/v1/status");
    expect(response.status).toBe(200);
    expect(await response.body).toEqual({
      updatedAt: expect.any(String),
      database: {
        maxConnections: 100,
        opendConnections: 1,
        version: "17.11",
      },
    });
    new Date(response.body.updatedAt).toISOString();
  });
});
