import request from "supertest";
import app from "../app.js";

describe("Usuarios", () => {
  it("deve listar usuários", async () => {
    const res = await request(app).get("/usuarios");
    expect([200, 401]).toContain(res.statusCode);
  });
});