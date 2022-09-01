"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("User POST request", () => {
    it("User can login successfully", async () => {
        const email = "jadeyemo002@gmail.com";
        const password = "abc12345678";
        const user = await (0, supertest_1.default)(app_1.default).post("/users/login").send({
            email,
            password,
        });
        expect(user.body).toHaveProperty("message");
    });
});
