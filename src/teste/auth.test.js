import request from "supertest";
import app from "../app.js";

describe("Auth", () => {
  it("deve registrar usuário", async () => {
    const res = await request(app)
      .post("/registrar")
      .send({
        nome: "Teste",
        email: `teste${Date.now()}@gmail.com`,
        senha: "123456",
        perfil: "admin",
      });

    expect(res.statusCode).toBe(201);
  });

  it("deve fazer login", async () => {
    const email = `login${Date.now()}@gmail.com`;

    await request(app).post("/auth/register").send({
      nome: "Login",
      email,
      senha: "123456",
      perfil: "admin",
    });

    const res = await request(app)
      .post("/login")
      .send({ email, senha: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});