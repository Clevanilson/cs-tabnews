import 'server-only';
import { join } from "node:path"
import { DB_CONNECTION_STRING } from '@/database/connection'
import { runner } from 'node-pg-migrate'
import { Client } from "pg";

export async function GET() {
  const response = await runner({
    databaseUrl: DB_CONNECTION_STRING,
    dir: join('src', 'migrations'),
    direction: 'up',
    dryRun: true,
    verbose: true,
    migrationsTable: 'migrations'
  })
  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  })
}
