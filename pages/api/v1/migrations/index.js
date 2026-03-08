import migrationRunner from 'node-pg-migrate'
import { request } from 'node:http';
import {join} from 'node:path';
import database from 'infra/database.js';


export default async function migrations(req, res) {
const dbClient = await database.getNewClient();
const devaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
};

  if (req.method === "GET") {
    console.log("Received GET request for migrations");
    const pendingMigrations = await migrationRunner({
      ...devaultMigrationOptions
    });
    await dbClient.end();
    return res.status(200).json(pendingMigrations);
  }

  if (req.method === "POST") {
    console.log("Received POST request for migrations");
    const migratedMigrations = await migrationRunner({
      ...devaultMigrationOptions,
      dryRun: false,
    });
    await dbClient.end();
    if(migratedMigrations.length > 0) {
      console.log("Migrations applied:", migrations);
       return res.status(201).json(migratedMigrations);
    }
    return res.status(200).json(migratedMigrations);
  }  

  return res.status(405).json({ error: "Method not allowed" });

}
 
