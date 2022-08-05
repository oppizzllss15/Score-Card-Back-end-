"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateAdmin = exports.activateAdmin = exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getAdmin = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminService_1 = require("../services/adminService");
require('dotenv').config();
const uuidv1 = require('uuid');
const ADMIN_EMAIL_DOMAIN = "decagon.dev";
const adminRegistrationSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).required(),
    lastname: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    stack: joi_1.default.string().required(),
    squad: joi_1.default.string().required(),
    role: joi_1.default.string(),
});
// console.log(dpass("une"))
async function getAdmin(req, res) {
    try {
        const admim = await (0, adminService_1.getAdminById)(req.params.adminId);
        if (admim)
            return res.status(200).send({ data: admim, message: "Admin data got successfully" });
        return res.status(400).send({ error: true, message: "no admin found" });
    }
    catch (err) {
        res.status(400).send("error getting admin");
    }
}
exports.getAdmin = getAdmin;
async function createAdmin(req, res) {
    const validation = adminRegistrationSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Registration Detail: " + validation.error.message });
    if (req.body.email.search(ADMIN_EMAIL_DOMAIN) === -1) {
        return res.status(400).send({ "error": true, message: "Please use an official email" });
    }
    const isUserInRegistered = await (0, adminService_1.isPropertyInDatabase)("email", req.body.email);
    if (isUserInRegistered)
        return res.status(400).send({ message: "Email already in use, try another" });
    let admin = req.body;
    admin.activationStatus = false;
    const password = uuidv1.v1().substr(0, 8).padStart("0", 8);
    admin.password = await bcrypt_1.default.hash(password, 10);
    //sendEmailToAdmin(admin.email, admin.password)
    const registeredAdmin = await (0, adminService_1.addAdmin)(admin);
    if (!registeredAdmin)
        return res.status(400).send({ message: "Ussername already in use, try another" });
    return res.status(200).send({ message: "Successfully created admin, password has been sent to " + admin.email, data: registeredAdmin, });
}
exports.createAdmin = createAdmin;
async function updateAdmin(req, res) {
    const validation = adminRegistrationSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Registration Detail: " + validation.error.message, });
    const adminId = req.params.adminId || req.body.adminId;
    const result = await (0, adminService_1.editAdmin)(adminId, req.body);
    if (!result) {
        return res.status(400).send({ message: "unable to register" });
    }
    const message = "successfully updated admin";
    return res.status(200).send({ data: result, message: message });
}
exports.updateAdmin = updateAdmin;
async function deleteAdmin(req, res) {
    const adminId = req.params.adminId || req.body.adminId;
    const result = await (0, adminService_1.removeAdmin)(adminId);
    if (!result) {
        return res.status(400).send({ message: "unable processing action" });
    }
    const message = "successfully deleted admin";
    return res.status(200).send({ data: result, message: message });
}
exports.deleteAdmin = deleteAdmin;
async function activateAdmin(req, res) {
    const adminId = req.params.adminId || req.body.adminId;
    const result = await (0, adminService_1.editAdminStatus)(adminId, true);
    if (!result) {
        return res.status(400).send({ message: "unable processing action" });
    }
    const message = "successfully deleted admin";
    return res.status(200).send({ data: result, message: message });
}
exports.activateAdmin = activateAdmin;
async function deactivateAdmin(req, res) {
    const adminId = req.params.adminId || req.body.adminId;
    const result = await (0, adminService_1.editAdminStatus)(adminId, false);
    if (!result) {
        return res.status(400).send({ message: "unable processing action" });
    }
    const message = "successfully deleted admin";
    return res.status(200).send({ data: result, message: message });
}
exports.deactivateAdmin = deactivateAdmin;
