"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user.model");
const findUserByEmail = async (email) => {
    const userExists = await User.find({ email: email.toLowerCase() });
    return userExists;
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
    return User.find();
};
const getUserScoreByName = async (firstname, lastname) => {
    const getStudentScores = await User.find({ firstname, lastname });
    return getStudentScores;
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
};
