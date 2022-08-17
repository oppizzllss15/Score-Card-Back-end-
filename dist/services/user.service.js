"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user.model");
const { superUserLogin } = require("../controllers/superadmin.controller");
const findUserByEmail = async (email) => {
    const userExists = await User.find({ email: email.toLowerCase() });
    return userExists;
};
const findUserDynamically = async (req, res, next) => {
    const userExists = await User.find({ email: req.body.email.toLowerCase() });
    if (userExists.length > 0)
        return userExists;
    return superUserLogin(req, res);
};
const createUser = async (firstname, lastname, email, hashedPass, squad, stack) => {
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashedPass,
        squad,
        stack,
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
const updateUserStatus = async (email, status) => {
    const deactivateUserAccount = await User.updateOne({ email: email.toLowerCase() }, {
        status: status.toLowerCase() === "active"
            ? status.toLowerCase()
            : "deactivated",
    });
    return deactivateUserAccount;
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
const validateUserTicketLink = async (id, ticket) => {
    const user = await User.find({ _id: id, password_ticket: ticket });
    return user;
};
const updateUserPassword = async (id, password) => {
    await User.updateOne({ _id: id }, { password: password });
};
const resetSecureTicket = async (id) => {
    await User.updateOne({ _id: id }, { password_ticket: null });
};
module.exports = {
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
    findUserDynamically
};
