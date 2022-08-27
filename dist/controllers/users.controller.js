"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { messageTransporter, passwordLinkTransporter, } = require("../utils/email");
const { generateToken, userRegistration, userUpdate, userLogin, userStatus, passwordHandler, passwordChange, score, } = require("../utils/utils");
const { findAllUsers, findUserByEmail, createUser, findUserById, updateUserById, updateUserStatus, updateUserScore, getAllUsers, getUserScoreByName, updateUserPhoneNo, updateUserProfileImg, updateUserTicket, validateUserTicketLink, updateUserPassword, resetSecureTicket, findUserDynamically, EmailToChangePassword, changeUserPassword, } = require("../services/user.service");
const { getUserStack } = require("../services/stack.service");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const randomPass = require("pino-password");
const jwt = require("jsonwebtoken");
const userProfileImage = asyncHandler(async (req, res, next) => {
    var _a, _b;
    if (req.file === undefined)
        return res.send("You must select a file.");
    const id = req.cookies.Id;
    await updateUserProfileImg(id, (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
    const findUser = await findUserById(id);
    res.status(201).json({ message: "Uploaded file successfully", findUser });
});
const userProfile = asyncHandler(async (req, res) => {
    const id = req.cookies.Id;
    if (!id) {
        res.status(400);
        throw new Error("Provide user id");
    }
    const findUser = await findUserById(id);
    const userStack = await getUserStack(findUser.stack);
    if (findUser) {
        res.status(201).json({
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            phone: findUser.phone,
            stack: userStack,
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
    const findUser = await findUserById(id);
    if (findUser) {
        await updateUserPhoneNo(id, req.body.phone);
        const changedNo = await findUserById(id);
        const userStack = await getUserStack(findUser.stack);
        res.status(201).json({
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            phone: changedNo.phone,
            stack: userStack,
            squad: findUser.squad,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, squad, stack } = req.body;
    await userRegistration().validateAsync({
        firstname: firstname,
        lastname: lastname,
        email: email,
        squad: squad,
        stack: stack,
    });
    const pass = new randomPass();
    const password = pass.generatePassword(firstname);
    const userExists = await findUserByEmail(email);
    if (userExists.length > 0) {
        res.status(400);
        throw new Error("User already exists");
    }
    const grades = [
        {
            week: 0,
            agile: 0,
            weekly_task: 0,
            assessment: 0,
            algorithm: 0,
            cummulative: 0,
        },
    ];
    const userStack = await getUserStack(stack);
    const hashedPass = await passwordHandler(password);
    const user = await createUser(firstname, lastname, email, hashedPass, squad, stack, grades);
    if (user) {
        await messageTransporter(email, firstname, password, squad);
        res.status(201).json({
            userId: user._id,
            password,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            stack: userStack,
            squad: user.squad,
            status: user.status,
            grades: user.grades,
        });
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const body = req.body;
    await userLogin().validateAsync({
        email: body.email,
        password: body.password,
    });
    const { email, password } = req.body;
    const user = await findUserDynamically(req, res);
    if (user.length > 0) {
        if (user[0].status !== "active") {
            res.status(404).json({ message: "Account deactivated" });
            return;
        }
        if (await bcrypt.compare(password, user[0].password)) {
            const token = generateToken(user[0]._id);
            await resetSecureTicket(user[0]._id);
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
    const user = await findUserById(id);
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
            status: user.status,
            profile_img: user.profile_img,
            cloudinary_id: user.cloudinary_id,
        };
        const updatedUser = await updateUserById(user._id, newData);
        const userStack = await getUserStack(updatedUser.stack);
        res.status(201).json({
            message: "Updated successfully",
            userId: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            stack: userStack,
            squad: updatedUser.squad,
            status: updatedUser.status,
            grades: updatedUser.grades,
        });
    }
    else {
        res.status(404).json({ message: "User not Found" });
    }
});
const activateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const findUser = await findUserById(id);
    const status = "active";
    if (findUser) {
        const activatedUserAccount = await updateUserStatus(id, status);
        res.status(201).json({
            message: `${activatedUserAccount.firstname} with ${activatedUserAccount.email} account activated successfully`,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const deactivateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const findUser = await findUserById(id);
    const status = "inactive";
    if (findUser) {
        const deactivateUserAccount = await updateUserStatus(id, status);
        res.status(201).json({
            message: `${deactivateUserAccount.firstname} with ${deactivateUserAccount.email} successfully deactivated`,
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
    const findUser = await findUserById(id);
    if (findUser) {
        await findUser.remove();
        res.status(201).json({
            message: `${findUser.email} with id ${id} has been removed`,
        });
    }
    else {
        res.status(404).json({ error: "User not found" });
    }
});
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("Token", "");
    res.cookie("Id", "");
    res.cookie("Name", "");
    res.status(201).json({ message: "Logged out successfully" });
});
//adding score
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
        cummulative: calCum.toFixed(2),
    };
    const userData = await updateUserScore(id, data);
    const getScores = await findUserById(id);
    res.status(201).json({
        message: "Updated successfully",
        scores: getScores.grades,
    });
});
const getScores = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getScores = await findUserById(id);
    if (getScores) {
        res.status(201).json({
            message: "All your score",
            scores: getScores.grades,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
const filterScores = asyncHandler(async (req, res) => {
    const week = Number(req.params.weekId);
    console.log(req.params.weekId, week);
    const getAllScores = await getAllUsers();
    const buffer = [];
    getAllScores.forEach((doc) => buffer.push({
        id: doc._id,
        firstname: doc.firstname,
        lastname: doc.lastname,
        week: doc.grades.filter((grd) => grd["week"] === week),
    }));
    res.status(201).json({ message: "Grade by week", week: buffer });
});
const getScoresByName = asyncHandler(async (req, res) => {
    const { firstname, lastname } = req.body;
    const getStudentScores = await getUserScoreByName(firstname, lastname);
    if (getStudentScores.length === 0) {
        res.status(400);
        throw new Error("Student does not exist");
    }
    console.log(getStudentScores[0].grades);
    res.status(201).json({
        message: "Student grades",
        scores: getStudentScores[0].grades,
    });
});
const getUserCummulatives = asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.userId);
    if (!user)
        return res.status(400).json({ message: "No user found" });
    let cummulatives = [];
    if (/cummulative/i.test(req.url)) {
        cummulatives = user.grades.map((grade) => {
            return { week: grade.week, cummulative: grade.cummulative };
        });
    }
    let data = {
        user,
        grades: user.grades,
        cummulatives,
    };
    return res.status(200).json({ data });
});
const updateUserPasword = asyncHandler(async (req, res) => {
    await passwordChange().validateAsync({
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
    });
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }
    const user = await findUserById(req.cookies.Id);
    if (user && (await bcrypt.compare(newPassword, user.password))) {
        res.status(401);
        throw new Error("New password cannot be the same with Old Password");
    }
    const newHashedPass = await passwordHandler(newPassword);
    await changeUserPassword(req.cookies.Id, newHashedPass);
    res.status(201).json({
        message: "Password successfully changed",
    });
});
const forgotUserPassword = asyncHandler(async (req, res) => {
    if (!req.body.email) {
        res.status(403);
        throw new Error("Please enter a valid email address");
    }
    const { email } = req.body;
    const user = await EmailToChangePassword(req, res);
    if (user.length > 0) {
        if (user[0].status !== "active") {
            res.status(404).json({ message: "Account deactivated" });
            return;
        }
        const ticket = generateToken(user[0]._id);
        // Update user ticket in database
        await updateUserTicket(user[0]._id, ticket);
        // Attach user ticket to link in message transporter
        const resetLink = `localhost:${process.env.EXTERNAL_PORT}/reset-password/${user[0]._id}/${ticket}`;
        await passwordLinkTransporter(email, resetLink);
        res
            .status(200)
            .json({ message: "Check your email for reset password link" });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const resetUserPassGetPage = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Use post method to reset password" });
});
const resetUserPass = asyncHandler(async (req, res) => {
    await passwordChange().validateAsync({
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
    });
    const ticket = req.params.ticket;
    const id = req.params.id;
    // Validate ticket from user account
    const user = await validateUserTicketLink(req, res);
    if (user.length === 0) {
        res.status(403);
        throw new Error("Invalid link");
    }
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }
    try {
        if (process.env.JWT_SECRET) {
            await jwt.verify(ticket, process.env.JWT_SECRET);
            const newHashedPass = await passwordHandler(newPassword);
            await updateUserPassword(id, newHashedPass);
            await resetSecureTicket(id);
            res.status(201).json({
                message: "Password successfully changed",
            });
        }
    }
    catch (error) {
        res.status(401);
        throw new Error("Link expired!");
    }
});
const getAllDevs = asyncHandler(async (req, res) => {
    const users = [];
    const userData = await findAllUsers();
    for (const usr of userData) {
        const data = {
            id: usr._id,
            firstname: usr.firstname,
            lastname: usr.lastname,
            email: usr.email,
            squad: `SQ0${usr.squad}`,
            stack: await getUserStack(usr.stack),
        };
        users.push(data);
    }
    res.status(201).json({ users });
});
module.exports = {
    getAllDevs,
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    activateUser,
    deactivateUser,
    deleteUser,
    userProfile,
    changeUserPhoneNumber,
    userProfileImage,
    calScore,
    getScores,
    filterScores,
    getScoresByName,
    forgotUserPassword,
    resetUserPassGetPage,
    resetUserPass,
    getUserCummulatives,
    updateUserPasword,
};
