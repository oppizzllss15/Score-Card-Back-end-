const {
  superAdminValidator,
  generateAdminToken,
  passwordHandler,
  userLogin,
  passwordChange,
} = require("../utils/utils");
const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
const Super = require("../models/superAdmin.model");
const bcrypt = require("bcryptjs");

const createSuperUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    email,
    stack,
    squad,
    password,
    phone,
    confirmPassword,
  } = req.body;
  await superAdminValidator().validateAsync({
    firstname: firstname,
    lastname: lastname,
    email: email,
    stack: stack,
    squad: squad,
    password: password,
    phone: phone,
    confirmPassword: confirmPassword,
  });

  if (password !== confirmPassword) {
    res.status(401);
    throw new Error("Passwords do not match");
  }

  const existingData = await Super.find();
  if (existingData.length > 0) {
    res.status(401);
    throw new Error("Super admin already exist");
  }

  const createData = await Super.create({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    stack: stack,
    secret: process.env.SECRET_PASS,
    squad: squad,
    password: await passwordHandler(password),
    phone: phone,
  });

  const token = generateAdminToken(createData._id);
  res.cookie("Token", token);
  res.cookie("Id", createData._id);
  res.cookie("Name", createData.firstname);

  res.status(201).json({
    user: createData,
    token: token,
  });
});

const superUserLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await userLogin().validateAsync({
    email: email,
    password: password,
  });

  const user = await Super.find();

  if (
    user[0].email === email.toLowerCase() &&
    (await bcrypt.compare(password, user[0].password)) &&
    user[0].secret === process.env.SECRET_PASS
  ) {
    const token = await generateAdminToken(user[0]._id);

    res.cookie("Token", token);
    res.cookie("Id", user[0]._id);
    res.cookie("Name", user[0].firstname);

    res.status(201).json({
      user: user[0],
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Input");
  }
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  await passwordChange().validateAsync({
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  });

  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const superUser = await Super.find();
  await Super.updateOne(
    { _id: superUser[0]._id },
    {
      password: await passwordHandler(newPassword),
    }
  );
  res.status(201).json({
    message: "Password successfully changed",
  });
});

const logoutSuperAdmin = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("Token", "");
  res.cookie("Id", "");
  res.cookie("Name", "");

  res.status(201).json({ message: "Logged out successfully" });
});

module.exports = { createSuperUser, superUserLogin, changePassword, logoutSuperAdmin };
