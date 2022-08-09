"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { superAdminValidator, generateSuperAdminToken, passwordHandler, userLogin, passwordChange, } = require("../utils/utils");
const asyncHandler = require("express-async-handler");
const Super = require("../models/superAdmin.model");
const bcrypt = require("bcryptjs");
const createSuperUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, stack, squad, password, phone, confirmPassword, } = req.body;
    await superAdminValidator().validateAsync({
        firstname: firstname,
        lastname: lastname,
        email: email,
        stack: stack,
        squad: squad,
        password: password,
        phone: phone,
        confirmPassword: confirmPassword,
    });
    if (password !== confirmPassword) {
        res.status(401);
        throw new Error("Passwords do not match");
    }
    const existingData = await Super.find();
    if (existingData.length > 0) {
        res.status(401);
        throw new Error("Super admin already exist");
    }
    const createData = await Super.create({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        stack: stack,
        secret: process.env.SECRET_PASS,
        squad: squad,
        password: await passwordHandler(password),
        phone: phone,
    });
    const token = generateSuperAdminToken(createData._id);
    res.cookie("Token", token);
    res.cookie("Id", createData._id);
    res.cookie("Name", createData.firstname);
    res.status(201).json({
        user: createData,
        token: token,
    });
});
const superUserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    await userLogin().validateAsync({
        email: email,
        password: password,
    });
    const user = await Super.find();
    if (user[0].email === email.toLowerCase() &&
        (await bcrypt.compare(password, user[0].password)) &&
        user[0].secret === process.env.SECRET_PASS) {
        const token = await generateSuperAdminToken(user[0]._id);
        res.cookie("Token", token);
        res.cookie("Id", user[0]._id);
        res.cookie("Name", user[0].firstname);
        res.status(201).json({
            user: user[0],
            token: token,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Input");
    }
});
const changePassword = asyncHandler(async (req, res) => {
    await passwordChange().validateAsync({
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
    });
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }
    const superUser = await Super.find();
    await Super.updateOne({ _id: superUser[0]._id }, {
        password: await passwordHandler(newPassword),
    });
    res.status(201).json({
        message: "Password successfully changed",
    });
});
const superUserProfileImage = asyncHandler(async (req, res, next) => {
    var _a, _b;
    if (req.file === undefined)
        return res.send("you must select a file.");
    const id = req.cookies.Id;
    await Super.updateOne({ _id: id }, { profile_img: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, cloudinary_id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename });
    const findSuper = await Super.find();
    res
        .status(201)
        .json({ message: "Uploaded file successfully", user: findSuper[0] });
});
const logoutSuperAdmin = asyncHandler(async (req, res) => {
    res.cookie("Token", "");
    res.cookie("Id", "");
    res.cookie("Name", "");
    res.status(201).json({ message: "Logged out successfully" });
});
// logic to enable superAdmin view all registered admins
const viewAdmins = asyncHandler(async (req, res) => {
    const admins = await viewAdmins.find();
    if (!admins)
        throw new Error;
    res.status(200).json(admins);
});
//ADMIN FUNCTIONS
module.exports = {
    createSuperUser,
    superUserLogin,
    changePassword,
    superUserProfileImage,
    logoutSuperAdmin,
    viewAdmins
};
