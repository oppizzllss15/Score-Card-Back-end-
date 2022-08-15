import app from "../app";
import request from "supertest";

describe("User POST request", () => {


   it("User can login successfully", async () => {
      const email = "jadeyemo002@gmail.com";
      const password = "abc12345678";
      const user = await request(app).post("/users/login").send({
         email,
         password,
      });
      expect(user.body).toHaveProperty("message");
   });




});
