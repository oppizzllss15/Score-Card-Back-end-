"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { adminRegistrationSchema, userLogin, adminUpdateSchema } = require("../utils/utils");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const { passwordHandler, generateAdminToken } = require("../utils/utils");
const { messageTransporter } = require("../utils/email");
require("dotenv").config();
const uuidv1 = require("uuid");
const { addAdmin, editAdmin, editAdminStatus, removeAdmin, updateAdminProfileImg, getAdminById, updateAdminPhoneNo, isPropertyInDatabase } = require("../services/admin.service");
const ADMIN_EMAIL_DOMAIN = "decagonhq.com";
const getAdmin = asyncHandler(async (req, res) => {
    const admim = await getAdminById(req.params.adminId);
    if (admim)
        return res.status(200).send({ data: admim, message: "Admin data got successfully" });
    return res.status(400).send({ error: true, message: "no admin found" });
});
const createAdmin = asyncHandler(async (req, res) => {
    const validation = await adminRegistrationSchema.validateAsync(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Registration Detail: " + validation.error.message });
    if (req.body.email.search(ADMIN_EMAIL_DOMAIN) === -1) {
        return res.status(400).send({ error: true, message: "Please use an official email" });
    }
    const isUserInRegistered = await isPropertyInDatabase("email", req.body.email);
    if (isUserInRegistered)
        return res.status(400).send({ message: "Email already in use, try another" });
    let admin = req.body;
    admin.activationStatus = true;
    const password = uuidv1.v1().substr(0, 8).padStart("0", 8);
    admin.password = await passwordHandler(password);
    const registeredAdmin = await addAdmin(admin);
    await messageTransporter(admin.email, admin.firstname, password);
    if (!registeredAdmin)
        return res.status(400).send({ message: "Ussername already in use, try another" });
    registeredAdmin.password = password;
    return res.status(201).send({
        data: registeredAdmin,
        message: `Successfully created admin, password: (${password}) has been sent to ${admin.email}`
    });
});
const updateAdmin = asyncHandler(async (req, res) => {
    const validation = adminUpdateSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Admin Detail: " + validation.error.message });
    const adminId = req.params.adminId || req.body.adminId;
    const result = await editAdmin(adminId, req.body);
    if (!result)
        return res.status(400).send({ message: "unable to register" });
    const newAdmin = await getAdminById(adminId);
    const message = "successfully updated admin";
    return res.status(200).send({ data: newAdmin, message: message });
});
const deleteAdmin = asyncHandler(async (req, res) => {
    const adminId = req.params.adminId || req.body.adminId;
    const result = await removeAdmin(adminId);
    if (!result) {
        return res.status(400).send({ message: "unable processing action" });
    }
    const message = "successfully deleted admin";
    return res.status(200).send({ data: result, message: message });
});
const setdminActivationStatus = asyncHandler(async (req, res) => {
    const adminId = req.params.adminId || req.body.adminId;
    const action = req.params.action || req.body.action;
    const activationStatus = /^activate$/i.test(action.trim()) ? true : false;
    const result = await editAdminStatus(adminId, activationStatus);
    if (!result)
        return res.status(400).send({ message: "unable to process action; Maybe no such admin was found", });
    const newAdmin = await getAdminById(adminId);
    const message = "successfully deleted admin";
    return res.status(200).send({ data: newAdmin, message: message });
});
const loginAdmin = asyncHandler(async (req, res) => {
    await userLogin().validateAsync({
        email: req.body.email,
        password: req.body.password,
    });
    const { email, password } = req.body;
    const admin = await isPropertyInDatabase("email", email);
    if (admin && !admin.activationStatus) {
        return res.status(404).json({ message: "Account deactivated" });
    }
    if (!admin)
        return res.status(400).send({ message: "Incorrect login details" });
    const passwordMatch = await bcrypt_1.default.compare(password, admin.password);
    if (passwordMatch) {
        const token = generateAdminToken(admin._id);
        res.cookie("Token", token);
        res.cookie("Name", admin.firstname);
        res.cookie("Id", admin._id);
        return res.status(200).json({ token, data: admin });
    }
    return res.status(400).json({ error: true, message: "Invalid login detail" });
});
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie("Token", "");
    res.cookie("Id", "");
    res.cookie("Name", "");
    res.status(200).json({ message: "Logged out successfully" });
});
const adminProfileImage = asyncHandler(async (req, res) => {
    var _a, _b;
    if (req.file === undefined)
        return res.send("You must select a file.");
    const id = req.cookies.Id;
    await updateAdminProfileImg(id, (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
    const findAdmin = await Admin.findById(id);
    res.status(201).json({ message: "Uploaded file successfully", findAdmin });
});
const adminProfile = asyncHandler(async (req, res) => {
    const id = req.cookies.Id;
    if (!id) {
        res.status(400);
        throw new Error("Provide Admin id");
    }
    const findAdmin = await Admin.findById(id);
    if (findAdmin) {
        res.status(201).json({
            firstname: findAdmin.firstname,
            lastname: findAdmin.lastname,
            email: findAdmin.email,
            stack: findAdmin.stack,
            squad: findAdmin.squad,
        });
    }
    else {
        res.status(404).json({ message: "Admin not found" });
    }
});
const changeAdminPhoneNumber = asyncHandler(async (req, res) => {
    const id = req.cookies.Id;
    if (!id) {
        res.status(400);
        throw new Error("Provide user id");
    }
    if (!req.body.phone) {
        res.status(400);
        throw new Error("Provide user new phone number");
    }
    const findAdmin = await Admin.findById(id);
    if (findAdmin) {
        await updateAdminPhoneNo(id, req.body.phone);
        res.status(201).json({
            message: "Phone number updated successfully",
        });
    }
    else {
        res.status(404).json({ message: "Admin account not found" });
    }
});
module.exports = {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    setdminActivationStatus,
    loginAdmin,
    logoutAdmin,
    adminProfileImage,
    adminProfile,
    changeAdminPhoneNumber,
};
