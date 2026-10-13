import { Client } from "pg";

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

export const DB_CONNECTION_STRING = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export async function query(
  queryStream: string,
  args: (number | string | boolean)[] = [],
) {
  const client = new Client({ connectionString: DB_CONNECTION_STRING });
  try {
    client.connect();
    const result = await client.query(queryStream, args);
    return result.rows;
  } catch (e) {
    throw e;
  } finally {
    client.end();
  }
}

