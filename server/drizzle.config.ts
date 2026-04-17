import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  // Point to the index file, not a wildcard
  schema: "./src/db/schema/index.ts", 
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URI!,
  },
});