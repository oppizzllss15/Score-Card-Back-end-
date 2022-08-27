"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const { getUserStack, getAdminUser, getSuperAdminUser, getAllStacks, deleteAStack, updateAStack, getSpecificStack, createAStack, getMultipleAdmins, deleteAnAdmin, updateAdminStack, getSpecificAdmin, addAnotherStackToAdmin, deleteDevs, } = require("../services/stack.service");
const Admin = require("../models/admin.model");
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
const viewAdminStack = asyncHandler(async (req, res) => {
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
    const { name, image } = req.body;
    const newStack = await createAStack({ name, image });
    res.status(201).json({
        status: "Success",
        message: {
            newStack,
        },
    });
    return;
});
const editStack = asyncHandler(async (req, res) => {
    var _a;
    const { name } = req.body;
    const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || name;
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
const addStackToAdmin = asyncHandler(async (req, res) => {
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
        }
        else {
            const updateStack = await addAnotherStackToAdmin(id, stack);
            res.status(200).json({
                status: "Successful",
                message: "SA successfuly assigned to new stack",
            });
            return;
        }
    }
});
const deleteStack = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const removeAdminsInStack = await getMultipleAdmins(id);
    for (let i = 0; i < removeAdminsInStack.length; i++) {
        if (removeAdminsInStack[i].stack.length <= 1) {
            await deleteAnAdmin(id);
        }
        else if (removeAdminsInStack[i].stack.length > 1) {
            removeAdminsInStack[i].stack.splice(removeAdminsInStack[i].stack.indexOf(id), 1);
            const { stack } = removeAdminsInStack[i];
            const updateStack = await updateAdminStack(removeAdminsInStack[i]._id, stack);
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
    viewAdminStack,
    addStackToAdmin,
    stacksShield,
    stacksShield2,
};
