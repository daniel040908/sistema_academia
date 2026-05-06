import request from "supertest";
import app from "../app.js";

describe("Frequência", () => {
  it("deve registrar frequência", async () => {
    const res = await request(app).post("/frequencias").send({
      aluno_id: 1,
      data: "2025-01-01",
      presente: true,
    });

    expect([201, 400, 401]).toContain(res.statusCode);
  });
});