"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user.model");
const { superUserLogin, forgotSuperAdminPassword, resetSuperAdminPass } = require("../controllers/superadmin.controller");
const findUserByEmail = async (email) => {
    const userExists = await User.find({ email: email.toLowerCase() });
    return userExists;
};
const findAllUsers = async () => {
    const users = await User.find();
    return users;
};
const findUserDynamically = async (req, res, next) => {
    const userExists = await User.find({ email: req.body.email.toLowerCase() });
    if (userExists.length > 0)
        return userExists;
    return superUserLogin(req, res);
};
const EmailToChangePassword = async (req, res, next) => {
    const userExists = await User.find({ email: req.body.email.toLowerCase() });
    if (userExists.length > 0)
        return userExists;
    return forgotSuperAdminPassword(req, res);
};
const createUser = async (firstname, lastname, email, hashedPass, squad, stack, grades) => {
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashedPass,
        squad,
        stack,
        grades
    });
    return user;
};
const findUserById = async (id) => {
    const user = await User.findById(id);
    if (user) {
        return user;
    }
    else {
        return false;
    }
};
const updateUserById = async (id, data) => {
    const updatedUser = await User.findByIdAndUpdate(id, data, {
        new: true,
    });
    return updatedUser;
};
const updateUserStatus = async (id, status) => {
    const userStatus = await User.updateOne({ _id: id }, {
        status: status
    });
    return await findUserById(id);
};
const updateUserScore = async (id, data) => {
    const userData = await User.updateOne({ _id: id }, { $push: { grades: data } });
};
const updateUserPhoneNo = async (id, data) => {
    await User.updateOne({ _id: id }, { phone: data });
};
const updateUserProfileImg = async (id, filePath, filename) => {
    await User.updateOne({ _id: id }, { profile_img: filePath, cloudinary_id: filename });
};
const getAllUsers = async () => {
    return await User.find();
};
const getUserScoreByName = async (firstname, lastname) => {
    const getStudentScores = await User.find({ firstname, lastname });
    return getStudentScores;
};
const updateUserTicket = async (id, ticket) => {
    await User.updateOne({ _id: id }, { password_ticket: ticket });
};
const validateUserTicketLink = async (req, res, next) => {
    const ticket = req.params.ticket;
    const id = req.params.id;
    const user = await User.find({ _id: id, password_ticket: ticket });
    if (user.length > 0)
        return user;
    return resetSuperAdminPass(req, res);
};
const updateUserPassword = async (id, password) => {
    await User.updateOne({ _id: id }, { password: password });
};
const resetSecureTicket = async (id) => {
    await User.updateOne({ _id: id }, { password_ticket: null });
};
module.exports = {
    findAllUsers,
    findUserByEmail,
    createUser,
    findUserById,
    updateUserById,
    updateUserStatus,
    updateUserScore,
    getAllUsers,
    getUserScoreByName,
    updateUserPhoneNo,
    updateUserProfileImg,
    updateUserTicket,
    validateUserTicketLink,
    updateUserPassword,
    resetSecureTicket,
    findUserDynamically,
    EmailToChangePassword
};
