"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const Stacks = require("../models/stack");
const SuperUser = require("../models/superAdmin.model");
const mongoose = require("mongoose");
const admin_model_1 = require("../models/admin.model");
// const toId = mongoose.Schema.types.ObjectId
const stacksShield = asyncHandler(async (req, res, next) => {
    const userID = req.cookies.Id;
    console.log(userID);
    const adminUser = await admin_model_1.Admin.find({ _id: userID });
    console.log(adminUser);
    const superUser = await SuperUser.findOne({ _id: userID });
    if (superUser)
        next();
    // else if (adminUser) {
    //   res.status(403).json({
    //     status: "Failed",
    //     message: `Hi ${adminUser.firstname}, you can only access the stack you have been assigned to`,
    //   });
    //   return;
    // }
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
    const superUser = await SuperUser.findOne({ _id: userID });
    const admin = await admin_model_1.Admin.findOne({ _id: userID });
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
    const allStacks = await Stacks.find({}, { _id: 0, __v: 0 });
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
    console.log(userID);
    const admin = await admin_model_1.Admin.findOne({ _id: userID });
    console.log(admin);
    const stack = admin.stack[0];
    console.log(stack);
    const adminStack = [];
    // for (let el in stack) {
    //   const user: IUser = await Stacks.find({ _id: el });
    //   console.log(user);
    //   adminStack.push(user);
    // }
    for (let i = 0; i < admin.stack.length; i++) {
        const user = await Stacks.find({ _id: admin.stack[i] });
        console.log(user);
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
    const newStack = await Stacks.create(req.body);
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
    const stack = await Stacks.findOne({ _id: id });
    const input = {
        image: image || stack.image,
        name: name || stack.name,
    };
    const updInput = await Stacks.findByIdAndUpdate(id, input, {
        new: true,
    });
    res.status(201).json({
        status: "Success",
        message: {
            updInput,
        },
    });
});
const deleteStack = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const removeStack = await Stacks.findOneAndRemove({ _id: id });
    res.status(201).json({
        status: "Success",
        message: "Had to let you go",
    });
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