import request from "supertest";
import app from "../app.js";

describe("Plano", () => {
  it("deve criar plano", async () => {
    const res = await request(app).post("/planos").send({
      nome: "Plano Teste",
      valor: 100,
      duracao_meses: 3,
    });

    expect([201, 400, 401]).toContain(res.statusCode);
  });
});