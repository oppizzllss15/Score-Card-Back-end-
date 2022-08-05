"use strict";
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};
function userRegistration() {
    return Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().min(8).required(),
        phone: Joi.string().required(),
        squad: Joi.string().required(),
        stack: Joi.string().required(),
    });
}
function userUpdate() {
    return Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string().required(),
        squad: Joi.string().required(),
        stack: Joi.string().required(),
    });
}
function userLogin() {
    return Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
}
function userStatus() {
    return Joi.object({
        email: Joi.string().required(),
        status: Joi.string().required(),
    });
}
const passwordHandler = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const superAdminValidator = () => {
    return Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        stack: Joi.string().required(),
        squad: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        confirmPassword: Joi.string().required(),
    });
};
function passwordChange() {
    return Joi.object({
        newPassword: Joi.string().required(),
        confirmPassword: Joi.string().required(),
    });
}
module.exports = {
    superAdminValidator,
    userLogin,
    passwordHandler,
    generateToken,
    passwordChange,
    userUpdate,
    userStatus,
};
