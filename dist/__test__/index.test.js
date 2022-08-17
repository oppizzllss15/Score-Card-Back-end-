"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.setTimeout(35000);
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
    // SUPER ADMIN LOGIN
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
    // CREATE USER ACCOUNT
    it("create a user account successfully", async () => {
        const email = "jadeyemo002@gmail.com";
        const password = "abc12345678";
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email,
            password,
        });
        const createUser = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/user/create")
            .set("authorization", `Bearer ${login.body.token}`)
            .send({
            firstname: "John",
            lastname: "Smith",
            email: "john404@gmail.com",
            stack: "62ed32168caecd292097dae6",
            squad: 11,
        });
        expect(createUser.status).toBe(201);
        expect(createUser.body).not.toEqual(null);
        expect(createUser.body.firstname).toBeDefined();
    });
    it("Change super admin password", async () => {
        const email = "jadeyemo002@gmail.com";
        const password = "abc12345678";
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email,
            password,
        });
        const changePass = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/change/password")
            .set("authorization", `Bearer ${login.body.token}`)
            .send({
            newPassword: "abc12345678",
            confirmPassword: "abc12345678",
        });
        expect(changePass.status).toEqual(201);
        expect(changePass.body).toHaveProperty("message");
        expect(changePass.body.message).toMatch(/successful/gi);
    });
    it("Should check for invalid link", async () => {
        const user = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/reset/password/62f646266e5cda5f6952d23c/wejfguhgekfg")
            .send({
            newPassword: "jayeoba012",
            confirmPassword: "jayeoba012",
        });
        expect(user.status).toBe(403);
    });
    //   it("Should send mail if user forgot password", async () => {
    //     const changePass = await request(app)
    //       .post("/superadmin/forgot/password")
    //       .send({
    //         email: "jadeyemo002@gmail.com",
    //       });
    //     expect(changePass.status).toEqual(200);
    //     expect(changePass.body).toHaveProperty("message");
    //     expect(changePass.body.message).toMatch(/reset password/gi);
    //   });
    it("Should check if upload file is not empty", async () => {
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email: "jadeyemo002@gmail.com",
            password: "abc12345678",
        });
        const uploadFile = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/upload")
            .set("authorization", `Bearer ${login.body.token}`);
        expect(uploadFile.text).toMatch(/select a file/gi);
        expect(uploadFile.body.message).not.toBeDefined();
    });
});
describe("Super user GET request", () => {
    it("Super User can log out successfully", async () => {
        const logoutUsr = await (0, supertest_1.default)(app_1.default).get("/superadmin/logout");
        expect(logoutUsr.status).toBe(201);
        expect(logoutUsr.body.message).toMatch(/Logged out successfully/gi);
    });
    it("Get super admin profile", async () => {
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email: "jadeyemo002@gmail.com",
            password: "abc12345678",
        });
        const usr = await (0, supertest_1.default)(app_1.default)
            .get("/superadmin/profile")
            .set("authorization", `Bearer ${login.body.token}`);
        expect(usr.status).toEqual(201);
        expect(usr.body).toHaveProperty("firstname");
    });
    it("Get all admin profile", async () => {
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email: "jadeyemo002@gmail.com",
            password: "abc12345678",
        });
        const usr = await (0, supertest_1.default)(app_1.default)
            .get("/superadmin/all/admin")
            .set("authorization", `Bearer ${login.body.token}`);
        expect(usr.status).toEqual(200);
        expect(usr.body).toHaveProperty("Admins");
        expect(usr.body).toHaveProperty("message");
    });
    it("Should check for valid reset password link", async () => {
        const user = await (0, supertest_1.default)(app_1.default).get("/superadmin/reset/password/62f646266e5cda5f6952d23c/wejfguhgekfg");
        expect(user.status).toBe(201);
        expect(user.body).toHaveProperty("message");
    });
});
