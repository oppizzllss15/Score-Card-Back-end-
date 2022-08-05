import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import bcrypt from "bcrypt";
import { IAdmin } from "../typings";
import { isPropertyInDatabase, addAdmin, editAdmin, editAdminStatus, removeAdmin,  getAdminById } from "../services/adminService";
require('dotenv').config();
const uuidv1 = require('uuid');

const ADMIN_EMAIL_DOMAIN = "decagon.dev";

const adminRegistrationSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  stack: Joi.string().required(),
  squad: Joi.string().required(),
  role: Joi.string(),
});

// console.log(dpass("une"))
export async function getAdmin(req: Request, res: Response) {
  try{
    const admim = await getAdminById(req.params.adminId)
    if(admim) return res.status(200).send({data: admim, message: "Admin data got successfully"})

    return res.status(400).send({error: true, message: "no admin found"})
  }catch(err){res.status(400).send("error getting admin")}
}

export async function createAdmin(req: Request, res: Response) {
  const validation: ValidationResult = adminRegistrationSchema.validate(
    req.body
  );

  if (validation.error)
    return res.status(400).send({ message: "Registration Detail: " + validation.error.message });

  if(req.body.email.search(ADMIN_EMAIL_DOMAIN) === -1){
    return res.status(400).send({"error": true, message: "Please use an official email"})
  }

  const isUserInRegistered = await isPropertyInDatabase<string>( "email", req.body.email );

  if (isUserInRegistered) return res.status(400).send({ message: "Email already in use, try another" });
  
  let admin: IAdmin = req.body;
  admin.activationStatus = false;
  const password = uuidv1.v1().substr(0, 8).padStart("0", 8);
  admin.password = await bcrypt.hash(password, 10);

  //sendEmailToAdmin(admin.email, admin.password)

  const registeredAdmin = await addAdmin(admin);
  if (!registeredAdmin) return res.status(400).send({ message: "Ussername already in use, try another" });

  return res.status(200).send({message:"Successfully created admin, password has been sent to " + admin.email, data: registeredAdmin, });
}


export async function updateAdmin(req: Request, res: Response) {
  const validation: ValidationResult = adminRegistrationSchema.validate(
    req.body
  );

  if (validation.error) return res.status(400).send({message: "Registration Detail: " + validation.error.message,});

  const adminId = req.params.adminId || req.body.adminId;
  const result = await editAdmin(adminId, req.body);

  if (!result) {
    return res.status(400).send({ message: "unable to register" });
  }

  const message = "successfully updated admin";
  return res.status(200).send({ data: result, message: message });
}



export async function deleteAdmin(req: Request, res: Response) {
  const adminId = req.params.adminId || req.body.adminId;
  const result = await removeAdmin(adminId);

  if (!result) {
    return res.status(400).send({ message: "unable processing action" });
  }

  const message = "successfully deleted admin";
  return res.status(200).send({ data: result, message: message });
}



export async function activateAdmin(req: Request, res: Response) {
  const adminId = req.params.adminId || req.body.adminId;
  const result = await editAdminStatus(adminId, true);

  if (!result) {
    return res.status(400).send({ message: "unable processing action" });
  }

  const message = "successfully deleted admin";
  return res.status(200).send({ data: result, message: message });
}


export async function deactivateAdmin(req: Request, res: Response) {
  const adminId = req.params.adminId || req.body.adminId;
  const result = await editAdminStatus(adminId, false);

  if (!result) {
    return res.status(400).send({ message: "unable processing action" });
  }

  const message = "successfully deleted admin";
  return res.status(200).send({ data: result, message: message });
}

