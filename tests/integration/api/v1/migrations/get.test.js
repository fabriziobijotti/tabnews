import database from "infra/database.js";

beforeAll(clearDatabase);

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
};

test("GET to /api/v1/migrations should return 200 and status ok", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

const respondeBody = await response.json();
console.log(respondeBody);
  
expect(Array.isArray(respondeBody)).toBe(true);
expect(respondeBody.length).toBeGreaterThan(0);

});
