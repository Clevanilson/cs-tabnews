import { Client } from "pg";

export async function query(
  queryStream: string,
  args: (number | string | boolean)[] = [],
) {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
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
