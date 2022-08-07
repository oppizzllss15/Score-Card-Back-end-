const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const generateAdminToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_PASS, {
    expiresIn: "3d",
  });
};

const userRegistration = () => {
  return Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    squad: Joi.number().required(),
    stack: Joi.string().required(),
  });
}

const userUpdate = () => {
  return Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    phone: Joi.string(),
    squad: Joi.number(),
    stack: Joi.string(),
  });
}

const userLogin = () => {
  return Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
}

const userStatus = () => {
  return Joi.object({
    email: Joi.string().required(),
    status: Joi.string().required(),
  });
}

const passwordHandler = async (password: string) => {
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

const passwordChange = () => {
  return Joi.object({
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  });
}

const score = () => {
  return Joi.object({
     week: Joi.number().required(),
     agile: Joi.number().max(100).min(0).required(),
     weekly_task: Joi.number().max(100).min(0).required(),
     assessment: Joi.number().max(100).min(0).required(),
     algorithm: Joi.number().max(100).min(0).required(),
  });
}

module.exports = {
  superAdminValidator,
  userLogin,
  userRegistration,
  passwordHandler,
  generateToken,
  generateAdminToken,
  passwordChange,
  userUpdate,
  userStatus,
  score,
};
