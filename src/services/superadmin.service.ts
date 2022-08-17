const Super = require("../models/superAdmin.model");
const { loginAdmin } = require("../controllers/admin.controller")
import { Request, Response, NextFunction } from "express";

const findSuperUser = async () => {
  const user = await Super.find();
  return user;
};

const findSuperAdminByEmail = async (email: string) => {
  const userExists = await Super.find({ email: email.toLowerCase() });
  return userExists;
};

const findSuperUserDynamically = async (req: Request, res: Response, next: NextFunction) => {
  const userExists = await Super.find({ email: req.body.email.toLowerCase() });
  if (userExists.length > 0) return userExists;
  return loginAdmin(req, res)
};

const createSuperHandler = async (
  firstname: string,
  lastname: string,
  email: string,
  stack: string,
  secret: string,
  squad: string,
  hashedPass: string,
  phone: string
) => {
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

const updateSuperUserProfileImg = async (
  id: string,
  filePath: string,
  filename: String
) => {
  await Super.updateOne(
    { _id: id },
    { profile_img: filePath, cloudinary_id: filename }
  );
};

const updateSuperUserTicket = async (
  id: string,
  ticket: string,
) => {
  await Super.updateOne(
    { _id: id },
    { password_ticket: ticket }
  );
};

const validateSuperUserTicketLink = async (
  id: string,
  ticket: string,
) => {
  const user = await Super.find(
    { _id: id, password_ticket: ticket }
  );
  return user
};

const updateSuperUserPassword = async (
  id: string,
  password: string,
) => {
  await Super.updateOne(
    { _id: id },
    { password: password }
  );
};

const resetSuperUserSecureTicket = async (
  id: string,
) => {
  await Super.updateOne(
    { _id: id },
    { password_ticket: null }
  );
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
  findSuperUserDynamically
};
