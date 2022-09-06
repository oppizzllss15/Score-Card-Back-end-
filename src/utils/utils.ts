const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const generateAdminToken = (id: string) => {
  return jwt.sign({ id }, process.env.ADMIN_PASS, {
    expiresIn: "3d",
  });
};

const generateSuperAdminToken = (user: any) => {
  return jwt.sign({ user }, process.env.SECRET_PASS, {
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
    squad: Joi.number().required(),
    stack: Joi.string().required(),
  });
};

function userUpdate() {
  return Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    phone: Joi.string(),
    squad: Joi.number(),
    stack: Joi.string(),
  });
};

function userLogin() {
  return Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
};

function userStatus() {
  return Joi.object({
    email: Joi.string().required(),
    status: Joi.string().required(),
  });
};

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

function passwordChange() {
  return Joi.object({
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  });
};

const score = () => {
  return Joi.object({
    week: Joi.number().required(),
    agile: Joi.number().max(100).min(0).required(),
    weekly_task: Joi.number().max(100).min(0).required(),
    assessment: Joi.number().max(100).min(0).required(),
    algorithm: Joi.number().max(100).min(0).required(),
  });
};

const adminRegistrationSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  stack: Joi.string().required(),
  squad: Joi.number().required(),
  role: Joi.string(),
});

const adminUpdateSchema = Joi.object({
  firstname: Joi.string().min(3),
  lastname: Joi.string().min(3),
  email: Joi.string().email(),
  stack: Joi.string(),
  squad: Joi.number(),
  role: Joi.string(),
});

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
  adminRegistrationSchema,
  adminUpdateSchema,
  generateSuperAdminToken
};
