"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("Super user POST request", () => {
    it("Returns status code 401 for already registered Super user", async () => {
        const resp = await (0, supertest_1.default)(app_1.default).post("/superadmin/create").send({
            firstname: "Thompson",
            lastname: "Smith",
            email: "example@example.com",
            stack: "Nodejs",
            squad: "001",
            password: "12345678",
            phone: "08123456789",
            confirmPassword: "12345678",
        });
        expect(resp.status).toBe(401);
        expect(resp.body.user).not.toBeDefined();
        expect(resp.body.message).toMatch(/Already exist/gi);
    });
    it("Super User can login successfully", async () => {
        const email = "jadeyemo002@gmail.com";
        const password = "abc12345678";
        const user = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email,
            password,
        });
        expect(user.status).toEqual(201);
        expect(user.status).not.toEqual(401);
        expect(user.status).not.toEqual(404);
        expect(user.body.token).toBeDefined();
        expect(user.body.user).toBeDefined();
        expect(user.body.user.password).not.toEqual(password);
    });
    //create user
    it("should create a valid user", async () => {
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email: "jadeyemo002@gmail.com",
            password: "abc12345678",
        });
        const userWork = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/user/create")
            .set("authorization", `Bearer ${login.body.token}`)
            .send({
            firstname: "Adeleke",
            lastname: "Oba",
            email: "john404@gmail.com",
            squad: 10,
            stack: "62ed32168caecd292097dae6",
        });
        expect(userWork.status).toBe(201);
        //   expect(userWork.body.user).toHaveProperty("firstname");
        expect(userWork.body.user).not.toBeDefined();
    });
    //update user
    it("should be able update a valid user", async () => {
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email: "jadeyemo002@gmail.com",
            password: "abc12345678",
        });
        const userWork = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/user/create")
            .set("authorization", `Bearer ${login.body.token}`)
            .send({
            firstname: "Adeyemi",
            lastname: "Oba",
            email: "john480@gmail.com",
            squad: 10,
            stack: "62ed32168caecd292097dae6",
        });
        const updateWork = await (0, supertest_1.default)(app_1.default)
            .post(`/superadmin/user/update/${userWork.body.userId}`)
            .set("authorization", `Bearer ${login.body.token}`)
            .send({
            firstname: "Doris",
        });
        expect(updateWork.status).toBe(201);
        expect(updateWork.body).toHaveProperty("message");
        expect(updateWork.body.message).toMatch(/successful/gi);
    });
    //calculate userscore
    it("should be able to get cslculated score", async () => {
        const updateWork = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/user/calculate/score/:id")
            .send({
            week: "1",
            agile: 100,
            weekly_task: 100,
            assessment: 100,
            algorithm: 100,
        });
        expect(updateWork.status).toBe(401);
        expect(updateWork.body.user).not.toBeDefined();
    });
});
//get method
describe("Super user GET request", () => {
    it("Super User can log out successfully", async () => {
        const logoutUsr = await (0, supertest_1.default)(app_1.default).get("/superadmin/logout");
        expect(logoutUsr.status).toBe(201);
        expect(logoutUsr.body.message).toMatch(/Logged out successfully/gi);
    });
});
