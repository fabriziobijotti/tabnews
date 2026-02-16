test("GET to /api/v1/status should return 200 and status ok", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const data = await res.json();

  expect(res.status).toBe(200);
  expect(data).toEqual({ message: "My api next.js, uhuuuu!!!" });
});
