import { query } from "@/database/connection";
import { StatusRes } from "@/types/status.res";

export async function GET() {
  const result = await query(
    "SELECT version(), current_setting('max_connections') AS max_connections;",
  );
  const { version, max_connections } = result[0];
  const versionNumber = (version as string).match(/\d+\.\d+/)?.[0] ?? version;
  const DB_NAME = process.env.DB_NAME as string;
  console.log(process.env);
  const opendConnectionsRows = await query(
    "SELECT * FROM pg_stat_activity WHERE datname = $1;",
    [DB_NAME],
  );
  const response: StatusRes = {
    updatedAt: new Date().toISOString(),
    database: {
      maxConnections: +max_connections,
      version: versionNumber,
      opendConnections: opendConnectionsRows.length,
    },
  };
  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
}
