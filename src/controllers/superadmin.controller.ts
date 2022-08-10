const {
  superAdminValidator,
  generateSuperAdminToken,
  passwordHandler,
  userLogin,
  passwordChange,
} = require("../utils/utils");
const asyncHandler = require("express-async-handler");
import { Request, Response, NextFunction } from "express";
const {
  findSuperUser,
  createSuperHandler,
  updateSuperUserPassword,
  updateSuperUserProfileImg,
} = require("../services/superadmin.service");
const {viewAdminDetails} = require("../services/admin.service");
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

  const existingData = await findSuperUser();
  if (existingData.length > 0) {
    res.status(401);
    throw new Error("Super admin already exist");
  }

  const hashedPass = await passwordHandler(password);
  const createData = await createSuperHandler(
    firstname,
    lastname,
    email,
    stack,
    process.env.SECRET_PASS,
    squad,
    hashedPass,
    phone
  );

  const token = generateSuperAdminToken(createData._id);
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

  const user = await findSuperUser();

  if (
    user[0].email === email.toLowerCase() &&
    (await bcrypt.compare(password, user[0].password)) &&
    user[0].secret === process.env.SECRET_PASS
  ) {
    const token = await generateSuperAdminToken(user[0]._id);

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

  const superUser = await findSuperUser();
  const newHashedPass = await passwordHandler(newPassword);
  await updateSuperUserPassword(superUser[0]._id, newHashedPass);
  res.status(201).json({
    message: "Password successfully changed",
  });
});

const superUserProfileImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const id = req.cookies.Id;
    await updateSuperUserProfileImg(id, req.file?.path, req.file?.filename);
    const findSuper = await findSuperUser();

    res
      .status(201)
      .json({ message: "Uploaded file successfully", user: findSuper[0] });
  }
);

const getSuperAdminProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const findSuper = await findSuperUser();

    if (findSuper.length === 0) {
      res.status(404);
      throw new Error("No Super Admin Profile found");
    }

    res.status(201).json({
      firstname: findSuper[0].firstname,
      lastname: findSuper[0].lastname,
      email: findSuper[0].email,
      stack: findSuper[0].stack,
      squad: findSuper[0].squad,
    });
  }
);

const viewAllAdmins = asyncHandler(async (req: Request, res: Response) => {
  const allAdmin  =  await viewAdminDetails()
  res.status(200).json({Admins: allAdmin})
});

const logoutSuperAdmin = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("Token", "");
  res.cookie("Id", "");
  res.cookie("Name", "");

  res.status(201).json({ message: "Logged out successfully" });
});

//ADMIN FUNCTIONS

module.exports = {
  createSuperUser,
  superUserLogin,
  changePassword,
  viewAllAdmins,
  superUserProfileImage,
  getSuperAdminProfile,
  logoutSuperAdmin,
};
