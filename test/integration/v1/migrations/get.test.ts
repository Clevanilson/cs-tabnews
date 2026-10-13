import { expect, test, describe, vi } from "vitest";
import { FetchAdapter } from "@/http/http-client";
import { BASE_URL } from "@test/support/const/base-url";
import { StatusRes } from "@/types/status.res";

describe("GET /api/v1/migrations", () => {
  test("With success", async () => {
    const httpClient = new FetchAdapter(BASE_URL);
    const response = await httpClient.get<StatusRes>("/api/v1/migrations");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
