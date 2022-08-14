"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const { getUserStack, getAdminUser, getSuperAdminUser, getAllStacks, deleteAStack, updateAStack, getSpecificStack, createAStack, } = require("../services/stack.service");
const Devs = require("../models/user.model");
// const toId = mongoose.Schema.types.ObjectId
const stacksShield = asyncHandler(async (req, res, next) => {
    const userID = req.cookies.Id;
    const superUser = await getSuperAdminUser(userID);
    if (superUser)
        next();
    else {
        res.status(403).json({
            status: "Failed",
            message: "You currently have no permission to view this page.",
        });
        return;
    }
});
const stacksShield2 = asyncHandler(async (req, res, next) => {
    const userID = req.cookies.Id;
    const superUser = await getSuperAdminUser(userID);
    const admin = await getAdminUser(userID);
    if (admin)
        next();
    else if (superUser) {
        res.status(200).json({
            status: "Success",
            message: `Hi SuperAdmin, please view all stacks`,
        });
    }
    else {
        res.status(403).json({
            status: "Failed",
            message: "Access Denied.",
        });
        return;
    }
});
const viewAllStacks = asyncHandler(async (req, res) => {
    const allStacks = await getAllStacks();
    res.status(200).json({
        status: "Success",
        message: {
            allStacks,
        },
    });
    return;
});
const viewStack = asyncHandler(async (req, res) => {
    const userID = req.cookies.Id;
    const admin = await getAdminUser(userID);
    const adminStack = [];
    for (let i = 0; i < admin.stack.length; i++) {
        const user = await getSpecificStack(admin.stack[i]);
        adminStack.push(user);
    }
    res.status(200).json({
        status: "Success",
        message: adminStack,
    });
    return;
});
const createStack = asyncHandler(async (req, res) => {
    const newStack = await createAStack(req.body);
    res.status(201).json({
        status: "Success",
        message: {
            newStack,
        },
    });
    return;
});
const editStack = asyncHandler(async (req, res) => {
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
const deleteStack = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const removeUsersInStack = await Devs.deleteMany({ stack: id });
    const removeStack = await deleteAStack(id);
    res.status(201).json({
        status: "Success",
        message: {
            removeStack,
            removeUsersInStack,
        },
    });
    return;
});
module.exports = {
    createStack,
    editStack,
    deleteStack,
    viewAllStacks,
    viewStack,
    stacksShield,
    stacksShield2,
};
