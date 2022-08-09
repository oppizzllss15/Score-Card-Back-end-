"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { messageTransporter } = require("../utils/email");
const { generateToken, userRegistration, userUpdate, userLogin, userStatus, passwordHandler, score, } = require("../utils/utils");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const randomPass = require("pino-password");
const userProfileImage = asyncHandler(async (req, res, next) => {
    var _a, _b;
    if (req.file === undefined)
        return res.send("you must select a file.");
    const id = req.cookies.Id;
    await User.updateOne({ _id: id }, { profile_img: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, cloudinary_id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename });
    const findUser = await User.findById(id);
    res.status(201).json({ message: "Uploaded file successfully", findUser });
});
const userProfile = asyncHandler(async (req, res) => {
    const id = req.cookies.Id;
    if (!id) {
        res.status(400);
        throw new Error("Provide user id");
    }
    const findUser = await User.findById(id);
    if (findUser) {
        res.status(201).json({
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            phone: findUser.phone,
            stack: findUser.stack,
            squad: findUser.squad,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const changeUserPhoneNumber = asyncHandler(async (req, res) => {
    const id = req.cookies.Id;
    if (!id) {
        res.status(400);
        throw new Error("Provide user id");
    }
    if (!req.body.phone) {
        res.status(400);
        throw new Error("Provide user new phone number");
    }
    const findUser = await User.findById(id);
    if (findUser) {
        await User.updateOne({ _id: id }, { phone: req.body.phone });
        const changedNo = await User.findById(id);
        res.status(201).json({
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            phone: changedNo.phone,
            stack: findUser.stack,
            squad: findUser.squad,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, squad, stack, } = req.body;
    await userRegistration().validateAsync({
        firstname: firstname,
        lastname: lastname,
        email: email,
        squad: squad,
        stack: stack,
    });
    const pass = new randomPass();
    const password = pass.generatePassword(firstname);
    console.log(password);
    const userExists = await User.find({ email: email.toLowerCase() });
    if (userExists.length > 0) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: await passwordHandler(password),
        squad,
        stack,
    });
    if (user) {
        await messageTransporter(email, firstname, password, squad);
        res.status(201).json({ user });
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const body = req.body;
    await userLogin().validateAsync({
        email: body.email,
        password: body.password,
    });
    const { email, password } = req.body;
    const user = await User.find({ email: email.toLowerCase() });
    if (user.length > 0) {
        if (user[0].status !== "active") {
            res.status(404).json({ message: "Account deactivated" });
            return;
        }
        if (await bcrypt.compare(password, user[0].password)) {
            const token = generateToken(user[0]._id);
            res.cookie("Token", token);
            res.cookie("Name", user[0].firstname);
            res.cookie("Id", user[0]._id);
            res.status(201).json({ token, user: user[0] });
        }
        else {
            res.status(404).json({ message: "Invalid password" });
            return;
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    await userUpdate().validateAsync({
        firstname: body.firstname,
        lastname: body.lastname,
        phone: body.phone,
        squad: body.squad,
        stack: body.stack,
    });
    const { firstname, lastname, phone, squad, stack } = req.body;
    const user = await User.findById(id);
    if (user) {
        const newData = {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            email: user.email,
            password: user.password,
            phone: phone || user.phone,
            squad: squad || user.squad,
            stack: stack || user.stack,
            grades: user.grades,
            profile_img: user.profile_img,
            cloudinary_id: user.cloudinary_id,
        };
        const updatedUser = await User.findByIdAndUpdate(user._id, newData, {
            new: true,
        });
        res.status(201).json({ message: "Updated successfully", updatedUser });
    }
    else {
        res.status(404).json({ message: "User not Found" });
    }
});
const deactivateUser = asyncHandler(async (req, res) => {
    await userStatus().validateAsync({
        email: req.body.email,
        status: req.body.status,
    });
    const { email, status } = req.body;
    const findUser = await User.find({ email: email.toLowerCase() });
    if (findUser.length > 0) {
        const deactivateUserAccount = await User.updateOne({ email: email.toLowerCase() }, {
            status: status.toLowerCase() === "active"
                ? status.toLowerCase()
                : "deactivated",
        });
        res.status(201).json({
            message: "Updated successfully",
            deactivateUserAccount,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("Provide user email address");
    }
    const findUser = await User.findById(id);
    if (findUser) {
        await findUser.remove();
        res.status(201).json({
            message: `${findUser.email} with id ${id} has been removed`,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("Token", "");
    res.cookie("Id", "");
    res.cookie("Name", "");
    res.status(201).json({ message: "Logged out successfully" });
});
const calScore = asyncHandler(async (req, res) => {
    await score().validateAsync({
        week: req.body.week,
        agile: req.body.agile,
        weekly_task: req.body.weekly_task,
        assessment: req.body.assessment,
        algorithm: req.body.algorithm,
    });
    const id = req.params.id;
    const { week, agile, weekly_task, assessment, algorithm } = req.body;
    const calCum = weekly_task * 0.4 + agile * 0.2 + assessment * 0.2 + algorithm * 0.2;
    const data = {
        week: week,
        agile: agile,
        weekly_task: weekly_task,
        assessment: assessment,
        algorithm: algorithm,
        cummulative: calCum,
    };
    const userData = await User.updateOne({ _id: id }, { $push: { grades: data } });
    const getScores = await User.findById(id);
    res
        .status(201)
        .json({ message: "Updated successfully", scores: getScores.grades });
});
const getScores = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getScores = await User.findById(id);
    res
        .status(201)
        .json({ message: "Grade successfully", scores: getScores.grades });
});
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deactivateUser,
    deleteUser,
    userProfile,
    changeUserPhoneNumber,
    userProfileImage,
    calScore,
    getScores,
};
