import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
const { adminRegistrationSchema, userLogin } = require("../utils/utils");
const asyncHandler = require("express-async-handler");
const  Admin = require("../models/admin.model");
import bcrypt from "bcrypt";

const { passwordHandler, generateAdminToken } = require("../utils/utils");
const { messageTransporter } = require("../utils/email");
require("dotenv").config();
const uuidv1 = require("uuid");

const {
  addAdmin,
  editAdmin,
  editAdminStatus,
  updateAdminProfileImg,
  getAdminById,
  updateAdminPhoneNo,
} = require("../services/admin.service");

const ADMIN_EMAIL_DOMAIN = "decagon.dev";

const getAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admim = await getAdminById(req.params.adminId);
  if (admim)
    return res
      .status(200)
      .send({ data: admim, message: "Admin data got successfully" });

  return res.status(400).send({ error: true, message: "no admin found" });
});

const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const validation: ValidationResult =
    await adminRegistrationSchema.validateAsync(req.body);

  if (validation.error)
    return res
      .status(400)
      .send({ message: "Registration Detail: " + validation.error.message });

  if (req.body.email.search(ADMIN_EMAIL_DOMAIN) === -1) {
    return res
      .status(400)
      .send({ error: true, message: "Please use an official email" });
  }

  const isUserInRegistered = await Admin.find({
    email: req.body.email.toLowerCase(),
  });

  if (isUserInRegistered.length > 0)
    return res
      .status(400)
      .send({ message: "Email already in use, try another" });

  let admin: IAdmin = req.body;
  admin.activationStatus = true;
  const password = uuidv1.v1().substr(0, 8).padStart("0", 8);
  console.log(password);
  admin.password = await passwordHandler(password);

  //sendEmailToAdmin(admin.email, admin.password)

  //const registeredAdmin = await addAdmin(admin);
  const registeredAdmin = await addAdmin({
    firstname: admin.firstname,
    lastname: admin.lastname,
    email: admin.email.toLowerCase(),
    password: admin.password,
    stack: [admin.stack],
    squad: admin.squad,
    role: admin.role,
  });
  await messageTransporter(admin.email, admin.firstname, password);
  if (!registeredAdmin)
    return res
      .status(400)
      .send({ message: "Ussername already in use, try another" });

  return res.status(201).send({
    data: registeredAdmin,
    message:
      "Successfully created admin, password has been sent to " + admin.email,
  });
});

const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
  const validation: ValidationResult = adminRegistrationSchema.validate(
    req.body
  );

  if (validation.error)
    return res
      .status(400)
      .send({ message: "Admin Detail: " + validation.error.message });

  const adminId = req.params.adminId || req.body.adminId;
  const result = await editAdmin({ _id: adminId }, { ...req.body });

  if (!result) return res.status(400).send({ message: "unable to register" });

  const newAdmin = await Admin.findById(adminId);
  const message = "successfully updated admin";
  return res.status(200).send({ data: newAdmin, message: message });
});

const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.params.adminId || req.body.adminId;
  const result = await deleteAdmin(adminId);

  if (!result) {
    return res.status(400).send({ message: "unable processing action" });
  }

  const newAdmin = await getAdminById(adminId);
  const message = "successfully deleted admin";
  return res.status(200).send({ data: newAdmin, message: message });
});

const setdminActivationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const adminId = req.params.adminId || req.body.adminId;
    const action = req.params.action || req.body.action;
    const activationStatus = /activate/i.test(action) ? true : false;
    const result = await editAdminStatus(adminId, { activationStatus });

    if (!result)
      return res.status(400).send({
        message: "unable to process action; Maybe no such admin was found",
      });

    const newAdmin = await Admin.findById(adminId);
    const message = "successfully deleted admin";
    return res.status(200).send({ data: newAdmin, message: message });
  }
);

const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  await userLogin().validateAsync({
    email: req.body.email,
    password: req.body.password,
  });

  const { email, password } = req.body;
  console.log(email);
  const admim: any = await Admin.find({ email });
  console.log(admim);

  if (admim.length > 0) {
    if (!admim[0].activationStatus) {
      return res.status(404).json({ message: "Account deactivated" });
    }

    const passwordMatch = await bcrypt.compare(password, admim[0].password);
    if (passwordMatch) {
      const token = generateAdminToken(admim[0]._id.toString());
      res.cookie("Token", token);
      res.cookie("Name", admim[0].firstname);
      res.cookie("Id", admim[0]._id);

      res.status(201).json({ token, data: admim[0] });
    } else {
      res.status(400).json({ error: true, message: "Invalid password" });
      return;
    }
  } else {
    return res.status(404).json({ error: true, message: "User not found" });
  }
});

const adminProfileImage = asyncHandler(async (req: Request, res: Response) => {
  if (req.file === undefined) return res.send("You must select a file.");
  const id = req.cookies.Id;
  await updateAdminProfileImg(id, req.file?.path, req.file?.filename);
  const findAdmin = await Admin.findById(id);

  res.status(201).json({ message: "Uploaded file successfully", findAdmin });
});

const adminProfile = asyncHandler(async (req: Request, res: Response) => {
  const id = req.cookies.Id;
  if (!id) {
    res.status(400);
    throw new Error("Provide Admin id");
  }

  const findAdmin = await Admin.findById(id);
  if (findAdmin) {
    res.status(201).json({
      firstname: findAdmin.firstname,
      lastname: findAdmin.lastname,
      email: findAdmin.email,
      stack: findAdmin.stack,
      squad: findAdmin.squad,
    });
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

const changeAdminPhoneNumber = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.cookies.Id;
    if (!id) {
      res.status(400);
      throw new Error("Provide user id");
    }

    if (!req.body.phone) {
      res.status(400);
      throw new Error("Provide user new phone number");
    }

    const findAdmin = await Admin.findById(id);
    if (findAdmin) {
      await updateAdminPhoneNo(id, req.body.phone);

      res.status(201).json({
        message: "Phone number updated successfully",
      });
    } else {
      res.status(404).json({ message: "Admin account not found" });
    }
  }
);

module.exports = {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  setdminActivationStatus,
  loginAdmin,
  adminProfileImage,
  adminProfile,
  changeAdminPhoneNumber,
};
