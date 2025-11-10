// src/db/index.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema"; // Import all your tables and relations

// Create the database client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// Create the Drizzle instance with your schema
export const db = drizzle(client, { schema });
