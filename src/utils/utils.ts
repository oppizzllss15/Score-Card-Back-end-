const Joi = require('joi')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
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
        confirmPassword: Joi.string().required()
    })
}

function userLogin() {
    return Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
}

function passwordChange() {
    return Joi.object({
        newPassword: Joi.string().required(),
        confirmPassword: Joi.string().required(),
    });
}

const passwordHandler = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};


module.exports = { superAdminValidator, userLogin, passwordHandler, generateToken, passwordChange }