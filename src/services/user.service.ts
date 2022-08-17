const User = require("../models/user.model");
import { NextFunction, Request, Response } from "express";
const { superUserLogin } = require("../controllers/superadmin.controller")


const findUserByEmail = async (email: string) => {
  const userExists = await User.find({ email: email.toLowerCase() });
  return userExists;
};

const findUserDynamically = async (req: Request, res: Response, next: NextFunction) => {
  const userExists = await User.find({ email: req.body.email.toLowerCase() });
  if (userExists.length > 0) return userExists;
  return superUserLogin(req, res)
};

const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  hashedPass: string,
  squad: number,
  stack: string
) => {
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

const findUserById = async (id: string) => {
  const user = await User.findById(id);
  if (user) {
    return user;
  } else {
    return false;
  }
};

const updateUserById = async (id: string, data: IAdmin) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};

const updateUserStatus = async (email: string, status: string) => {
  const deactivateUserAccount = await User.updateOne(
    { email: email.toLowerCase() },
    {
      status:
        status.toLowerCase() === "active"
          ? status.toLowerCase()
          : "deactivated",
    }
  );
  return deactivateUserAccount;
};

const updateUserScore = async (id: string, data: object) => {
  const userData = await User.updateOne(
    { _id: id },
    { $push: { grades: data } }
  );
};

const updateUserPhoneNo = async (id: string, data: string) => {
  await User.updateOne({ _id: id }, { phone: data });
};

const updateUserProfileImg = async (
  id: string,
  filePath: string,
  filename: String
) => {
  await User.updateOne(
    { _id: id },
    { profile_img: filePath, cloudinary_id: filename }
  );
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserScoreByName = async (firstname: string, lastname: string) => {
  const getStudentScores = await User.find({ firstname, lastname });
  return getStudentScores;
};

const updateUserTicket = async (id: string, ticket: string) => {
  await User.updateOne({ _id: id }, { password_ticket: ticket });
};

const validateUserTicketLink = async (id: string, ticket: string) => {
  const user = await User.find({ _id: id, password_ticket: ticket });
  return user;
};

const updateUserPassword = async (id: string, password: string) => {
  await User.updateOne({ _id: id }, { password: password });
};

const resetSecureTicket = async (id: string) => {
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
