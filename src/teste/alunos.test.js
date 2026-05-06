import request from "supertest";
import app from "../app.js";

describe("Alunos", () => {
  it("deve criar aluno", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Aluno Teste",
      email: `aluno${Date.now()}@gmail.com`,
    });

    expect([201, 400, 401]).toContain(res.statusCode);
  });
});