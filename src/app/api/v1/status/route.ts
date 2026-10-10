import { query } from "@/database/connection";
import { StatusRes } from "@/types/status.res";

export async function GET() {
  const result = await query(
    "SELECT version(), current_setting('max_connections') AS max_connections;",
  );
  const { version, max_connections } = result[0];
  const versionNumber = (version as string).match(/\d+\.\d+/)?.[0] ?? version;
  const response: StatusRes = {
    updatedAt: new Date().toISOString(),
    database: {
      maxConnections: +max_connections,
      version: versionNumber,
    }
  }
  return new Response(
    JSON.stringify(response),
    { headers: { "Content-Type": "application/json" } },
  );
}
