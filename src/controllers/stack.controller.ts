const asyncHandler = require("express-async-handler");

const {
  getUserStack,
  getAdminUser,
  getSuperAdminUser,
  getAllStacks,
  deleteAStack,
  updateAStack,
  getSpecificStack,
  createAStack,
  getMultipleAdmins,
  deleteAnAdmin,
  updateAdminStack,
  getSpecificAdmin,
  addAnotherStackToAdmin,
  deleteDevs,
} = require("../services/stack.service");
const Admin = require("../models/admin.model");
const Devs = require("../models/user.model");
import express, { Request, Response, NextFunction } from "express";

// const toId = mongoose.Schema.types.ObjectId
const stacksShield = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.cookies.Id;

    const superUser = await getSuperAdminUser(userID);

    if (superUser) next();
    else {
      res.status(403).json({
        status: "Failed",
        message: "You currently have no permission to view this page.",
      });
      return;
    }
  }
);

const stacksShield2 = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.cookies.Id;
    const superUser = await getSuperAdminUser(userID);
    const admin = await getAdminUser(userID);
    if (admin) next();
    else if (superUser) {
      res.status(200).json({
        status: "Success",
        message: `Hi SuperAdmin, please view all stacks`,
      });
    } else {
      res.status(403).json({
        status: "Failed",
        message: "Access Denied.",
      });
      return;
    }
  }
);

const viewAllStacks = asyncHandler(async (req: Request, res: Response) => {
  const allStacks = await getAllStacks();

  res.status(200).json({
    status: "Success",
    message: {
      allStacks,
    },
  });
  return;
});

const viewStack = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.cookies.Id;

  const admin: IAdmin = await getAdminUser(userID);
  const adminStack: IUser[] = [];

  for (let i = 0; i < admin.stack.length; i++) {
    const user: IUser = await getSpecificStack(admin.stack[i]);
    adminStack.push(user);
  }

  res.status(200).json({
    status: "Success",
    message: adminStack,
  });
  return;
});

const createStack = asyncHandler(async (req: Request, res: Response) => {
  const newStack = await createAStack(req.body);

  res.status(201).json({
    status: "Success",
    message: {
      newStack,
    },
  });
  return;
});

const editStack = asyncHandler(async (req: Request, res: Response) => {
  const { name, image } = req.body;

  const id = req.params.id;

  const stack = await getSpecificStack(id);

  const input = {
    image: image || stack.image,
    name: name || stack.name,
  };

  const updInput = await updateAStack(id, input);

  res.status(201).json({
    status: "Success",
    message: {
      updInput,
    },
  });
  return;
});

const addStackToAdmin = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const { stack } = req.body;

  const SA = await getSpecificAdmin(id);

  for (let i = 0; i < SA.stack.length; i++) {
    let newId = SA.stack[i].toString();

    if (newId.includes(stack)) {
      res.status(400).json({
        status: "Failed",
        message: "Already an SA in this stack",
      });

      return;
    } else {
      const updateStack = await addAnotherStackToAdmin(id, stack);

      res.status(200).json({
        status: "Successful",
        message: "SA successfuly assigned to new stack",
      });

      return;
    }
  }
});

const deleteStack = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const removeAdminsInStack = await getMultipleAdmins(id);

  for (let i = 0; i < removeAdminsInStack.length; i++) {
    if (removeAdminsInStack[i].stack.length <= 1) {
      await deleteAnAdmin(id);
    } else if (removeAdminsInStack[i].stack.length > 1) {
      removeAdminsInStack[i].stack.splice(
        removeAdminsInStack[i].stack.indexOf(id),
        1
      );
      const { stack } = removeAdminsInStack[i];
      const updateStack = await updateAdminStack(
        removeAdminsInStack[i]._id,
        stack
      );
    }
  }
  const removeUsersInStack = await deleteDevs(id);

  const removeStack = await deleteAStack(id);

  res.status(201).json({
    status: "Success",
  });
  return;
});

module.exports = {
  createStack,
  editStack,
  deleteStack,
  viewAllStacks,
  viewStack,
  addStackToAdmin,
  stacksShield,
  stacksShield2,
};
