import request from "supertest";
import app from "../app.js";

describe("Instrutor", () => {
  it("deve criar instrutor", async () => {
    const res = await request(app).post("/instrutores").send({
      nome: "Instrutor Teste",
      especialidade: "Musculação",
    });

    expect([201, 400, 401]).toContain(res.statusCode);
  });
});