"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.setTimeout(35000);
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("Super user POST request", () => {
    // REGISTER SUPER ADMIN
    // it("Returns status code 401 for already registered Super user", async () => {
    //   const resp = await request(app).post("/superadmin/create").send({
    //     firstname: "Thompson",
    //     lastname: "Smith",
    //     email: "example@example.com",
    //     stack: "Nodejs",
    //     squad: "001",
    //     password: "12345678",
    //     phone: "08123456789",
    //     confirmPassword: "12345678",
    //   });
    //   expect(resp.status).toBe(401);
    //   expect(resp.body.user).not.toBeDefined();
    //   expect(resp.body.message).toMatch(/Already exist/gi);
    // });
    // // SUPER ADMIN LOGIN
    // it("Super User can login successfully", async () => {
    //   const email = "jadeyemo002@gmail.com";
    //   const password = "abc12345678";
    //   const user = await request(app).post("/superadmin/login").send({
    //     email,
    //     password,
    //   });
    //   expect(user.status).toEqual(201);
    //   expect(user.status).not.toEqual(401);
    //   expect(user.status).not.toEqual(404);
    //   expect(user.body.token).toBeDefined();
    //   expect(user.body.user).toBeDefined();
    //   expect(user.body.user.password).not.toEqual(password);
    // });
    // CREATE USER ACCOUNT
    it("create a user account successfully", async () => {
        const email = "jadeyemo002@gmail.com";
        const password = "abc12345678";
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email,
            password,
        });
        const createStack = await (0, supertest_1.default)(app_1.default)
            .post("/superadmin/createstack")
            .set("authorization", `Bearer ${login.body.token}`)
            .send({
            image: "amaechi moses ikenna",
            name: "Node.Js",
        });
        expect(createStack.status).toBe(200);
        expect(createStack.body).not.toEqual(null);
        // expect(createStack.body.name).toBeDefined();
    });
    // UPDATE USER ACCOUNT
    // it("should be able update a valid user", async () => {
    //   const login = await request(app).post("/superadmin/login").send({
    //     email: "jadeyemo002@gmail.com",
    //     password: "abc12345678",
    //   });
    //   const userWork = await request(app)
    //     .post("/superadmin/user/create")
    //     .set("authorization", `Bearer ${login.body.token}`)
    //     .send({
    //       firstname: "Adeyemi",
    //       lastname: "Oba",
    //       email: "john480@gmail.com",
    //       squad: 10,
    //       stack: "62ed32168caecd292097dae6",
    //     });
    //   const updateWork = await request(app)
    //     .post(`/superadmin/user/update/${userWork.body.userId}`)
    //     .set("authorization", `Bearer ${login.body.token}`)
    //     .send({
    //       firstname: "Doris",
    //     });
    //   expect(updateWork.status).toBe(201);
    //   expect(updateWork.body).toHaveProperty("message");
    //   expect(updateWork.body.message).toMatch(/successful/gi);
});
describe("Super user GET request", () => {
    //   // LOGOUT SUPER ADMIN
    //   it("Super User can log out successfully", async () => {
    //     const logoutUsr = await request(app).get("/superadmin/logout");
    //     expect(logoutUsr.status).toBe(201);
    //     expect(logoutUsr.body.message).toMatch(/Logged out successfully/gi);
    //   });
    //   // GET PROFILE
    //   it("Get super admin profile", async () => {
    //     const login = await request(app).post("/superadmin/login").send({
    //       email: "jadeyemo002@gmail.com",
    //       password: "abc12345678",
    //     });
    //     const usr = await request(app)
    //       .get("/superadmin/profile")
    //       .set("authorization", `Bearer ${login.body.token}`);
    //     expect(usr.status).toEqual(201);
    //     expect(usr.body).toHaveProperty("firstname");
    //   });
    it("Get all stacks", async () => {
        const email = "jadeyemo002@gmail.com";
        const password = "abc12345678";
        const login = await (0, supertest_1.default)(app_1.default).post("/superadmin/login").send({
            email,
            password,
        });
        const allStacks = await (0, supertest_1.default)(app_1.default)
            .get("/superadmin/stacks")
            .set("authorization", `Bearer ${login.body.token}`)
            .set("Cookie", ["id=62f646266e5cda5f6952d23c"]);
        expect(allStacks.status).toEqual(200);
        // expect(allStacks.body).toHaveProperty("name");
        // expect(allStacks.body).toHaveProperty("message");
    });
    //   // RESET PASSWORD LINK
    //   it("Should check for valid reset password link", async () => {
    //     const user = await request(app).get(
    //       "/superadmin/reset/password/62f646266e5cda5f6952d23c/wejfguhgekfg"
    //     );
    //     expect(user.status).toBe(201);
    //     expect(user.body).toHaveProperty("message");
    //   });
});
