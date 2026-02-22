import migrationRunner from 'node-pg-migrate'
import { request } from 'node:http';
import {join} from 'node:path';
export default async function migrations(req, res) {
  
  if (req.method === "POST") {
    console.log("Received POST request for migrations");
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return res.status(200).json(migrations);
  }

  if (req.method === "GET") {
    console.log("Received GET request for migrations");
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return res.status(200).json(migrations);
  }

  return res.status(405).json({ error: "Method not allowed" });

}
 
