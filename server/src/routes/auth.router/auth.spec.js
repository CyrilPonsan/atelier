const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const { initDB } = require("../../services/sequelize");

describe("API", () => {
  beforeAll(async () => {
    await initDB();
  });
  describe("Test POST /login", () => {
    const credentials = {
      username: "tech@atelier.fr",
      password: "toto",
    };
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .post("/v1/auth/")
        .send(credentials)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
