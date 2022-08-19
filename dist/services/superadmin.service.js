"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Super = require("../models/superAdmin.model");
const { loginAdmin, forgotAdminPassword, resetAdminPass } = require("../controllers/admin.controller");
const findSuperUser = async () => {
    const user = await Super.find();
    return user;
};
const findSuperAdminByEmail = async (email) => {
    const userExists = await Super.find({ email: email.toLowerCase() });
    return userExists;
};
const findSuperUserDynamically = async (req, res, next) => {
    const userExists = await Super.find({ email: req.body.email.toLowerCase() });
    if (userExists.length > 0)
        return userExists;
    return loginAdmin(req, res);
};
const EmailToManagePassword = async (req, res, next) => {
    const userExists = await Super.find({ email: req.body.email.toLowerCase() });
    if (userExists.length > 0)
        return userExists;
    return forgotAdminPassword(req, res);
};
const createSuperHandler = async (firstname, lastname, email, stack, secret, squad, hashedPass, phone) => {
    const createData = await Super.create({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        stack: stack,
        secret,
        squad: squad,
        password: hashedPass,
        phone: phone,
    });
    return createData;
};
const updateSuperUserProfileImg = async (id, filePath, filename) => {
    await Super.updateOne({ _id: id }, { profile_img: filePath, cloudinary_id: filename });
};
const updateSuperUserTicket = async (id, ticket) => {
    await Super.updateOne({ _id: id }, { password_ticket: ticket });
};
const validateSuperUserTicketLink = async (req, res, next) => {
    const ticket = req.params.ticket;
    const id = req.params.id;
    const user = await Super.find({ _id: id, password_ticket: ticket });
    if (user.length > 0)
        return user;
    return resetAdminPass(req, res);
};
const updateSuperUserPassword = async (id, password) => {
    await Super.updateOne({ _id: id }, { password: password });
};
const resetSuperUserSecureTicket = async (id) => {
    await Super.updateOne({ _id: id }, { password_ticket: null });
};
module.exports = {
    findSuperAdminByEmail,
    findSuperUser,
    createSuperHandler,
    updateSuperUserPassword,
    updateSuperUserProfileImg,
    updateSuperUserTicket,
    validateSuperUserTicketLink,
    resetSuperUserSecureTicket,
    findSuperUserDynamically,
    EmailToManagePassword
};
