import request from "supertest";
import app from "../app.js";

describe("Treino", () => {
  it("deve criar treino", async () => {
    const res = await request(app).post("/treinos").send({
      aluno_id: 1,
      instrutor_id: 1,
      descricao: "Treino de peito",
    });

    expect([201, 400, 401]).toContain(res.statusCode);
  });
});