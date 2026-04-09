import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index.js";
import "dotenv/config";

if(!process.env.POSTGRES_URI) {
  throw new Error("POSTGRES_URI is not defined in environment variables");
}

export const pool = new Pool({
  connectionString: String(process.env.POSTGRES_URI),
});

export const db = drizzle(pool, { schema });