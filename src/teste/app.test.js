import request from "supertest";
import app from "../app.js";

describe("App", () => {
  it("deve responder na rota raiz", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Api funcionando");
  });
});