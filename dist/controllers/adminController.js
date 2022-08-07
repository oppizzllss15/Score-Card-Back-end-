"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { adminRegistrationSchema } = require("../utils/utils");
const asyncHandler = require("express-async-handler");
const admin_model_1 = require("../models/admin.model");
//import { adminRegistrationSchema } from "../utils/utils";
const { passwordHandler, generateAdminToken } = require("../utils/utils");
const { messageTransporter } = require("../services/usersService");
require('dotenv').config();
const uuidv1 = require('uuid');
const ADMIN_EMAIL_DOMAIN = "decagon.dev";
// console.log(dpass("une"))
const getAdmin = asyncHandler(async (req, res) => {
    const admim = await admin_model_1.Admin.findById(req.params.adminId);
    if (admim)
        return res.status(200).send({ data: admim, message: "Admin data got successfully" });
    return res.status(400).send({ error: true, message: "no admin found" });
});
const createAdmin = asyncHandler(async (req, res) => {
    const validation = adminRegistrationSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Registration Detail: " + validation.error.message });
    if (req.body.email.search(ADMIN_EMAIL_DOMAIN) === -1) {
        return res.status(400).send({ "error": true, message: "Please use an official email" });
    }
    const isUserInRegistered = await admin_model_1.Admin.find({ email: req.body.email });
    if (isUserInRegistered.length > 0)
        return res.status(400).send({ message: "Email already in use, try another" });
    let admin = req.body;
    admin.activationStatus = false;
    const password = uuidv1.v1().substr(0, 8).padStart("0", 8);
    admin.password = await passwordHandler(password);
    //sendEmailToAdmin(admin.email, admin.password)
    //const registeredAdmin = await addAdmin(admin);
    const registeredAdmin = await admin_model_1.Admin.create({ ...admin });
    //await messageTransporter(admin.email, admin.firstname, password)
    if (!registeredAdmin)
        return res.status(400).send({ message: "Ussername already in use, try another" });
    return res.status(201).send({ data: registeredAdmin, message: "Successfully created admin, password has been sent to " + admin.email });
});
const updateAdmin = asyncHandler(async (req, res) => {
    const validation = adminRegistrationSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Registration Detail: " + validation.error.message, });
    const adminId = req.params.adminId || req.body.adminId;
    const result = await admin_model_1.Admin.updateOne({ _id: adminId }, { ...req.body });
    if (!result)
        return res.status(400).send({ message: "unable to register" });
    const newAdmin = await admin_model_1.Admin.findById(adminId);
    const message = "successfully updated admin";
    return res.status(200).send({ data: newAdmin, message: message });
});
const deleteAdmin = asyncHandler(async (req, res) => {
    const adminId = req.params.adminId || req.body.adminId;
    const result = await admin_model_1.Admin.findByIdAndRemove(adminId);
    if (!result) {
        return res.status(400).send({ message: "unable processing action" });
    }
    const newAdmin = await admin_model_1.Admin.findById(adminId);
    const message = "successfully deleted admin";
    return res.status(200).send({ data: newAdmin, message: message });
});
const setdminActivationStatus = asyncHandler(async (req, res) => {
    const adminId = req.params.adminId || req.body.adminId;
    const action = req.params.action || req.body.action;
    const activationStatus = /activate/i.test(action) ? true : false;
    const result = await admin_model_1.Admin.findByIdAndUpdate(adminId, { activationStatus });
    if (!result)
        return res.status(400).send({ message: "unable to process action; Maybe no such admin was found" });
    const newAdmin = await admin_model_1.Admin.findById(adminId);
    const message = "successfully deleted admin";
    return res.status(200).send({ data: newAdmin, message: message });
});
const loginAdmin = asyncHandler(async (req, res) => {
    await userLogin().validateAsync({
        email: req.body.email,
        password: req.body.password,
    });
    const { email, password } = req.body;
    const admim = await admin_model_1.Admin.find({ email: email.toLowerCase() });
    if (admim.length > 0) {
        if (admim[0].activationStatus) {
            res.status(404).json({ message: "Account deactivated" });
            return;
        }
        if (await bcrypt.compare(password, admim[0].password)) {
            const token = generateToken((admim[0]._id).toString());
            res.cookie("Token", token);
            res.cookie("Name", admim[0].firstname);
            res.cookie("Id", admim[0]._id);
            res.status(201).json({ token, data: admim[0] });
        }
        else {
            res.status(404).json({ error: true, message: "Invalid password" });
            return;
        }
    }
    else {
        res.status(404).json({ error: true, message: "User not found" });
    }
});
module.exports = {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    setdminActivationStatus,
    loginAdmin
};
