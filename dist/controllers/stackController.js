"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const Stacks = require("../models/stack");
const SuperUser = require("../models/superAdmin.model");
const Admin = require("../models/admin.model");
const stacksShield = asyncHandler(async (req, res, next) => {
    const userID = req.cookies.uID;
    const superUser = await SuperUser.findOne({ _id: userID });
    const admin = await Admin.findOne({ _id: userID });
    if (superUser)
        next();
    else if (admin) {
        res.status(403).json({
            status: "Failed",
            message: `Hi ${admin.firstname}, you can only access the stack you have been assigned to`,
        });
        return;
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
};
