"use strict";
const Stacks = require("../models/stack");
const SuperUser = require("../models/superAdmin.model");
const Admins = require("../models/admin.model");
const getUserStack = async (id) => {
    const stackName = await Stacks.findById(id);
    return stackName.name;
};
const getSpecificStack = async (id) => {
    const stack = await Stacks.find({ _id: id });
    return stack;
};
const getAdminUser = async (id) => {
    const adminUser = await Admins.findOne({ _id: id });
    return adminUser;
};
const getSuperAdminUser = async (id) => {
    const superUser = await SuperUser.findOne({ _id: id });
    return superUser;
};
const getAllStacks = async () => {
    const allStacks = await Stacks.find({}, { _id: 0, __v: 0 });
    return allStacks;
};
const deleteAStack = async (id) => {
    const removeStack = await Stacks.findOneAndRemove({ _id: id });
    return removeStack;
};
const updateAStack = async (id, input) => {
    const updInput = await Stacks.findByIdAndUpdate(id, input, {
        new: true,
    });
    return updInput;
};
const createAStack = async (body) => {
    const newStack = await Stacks.create(body);
    return newStack;
};
module.exports = {
    getUserStack,
    getAdminUser,
    getSuperAdminUser,
    getAllStacks,
    deleteAStack,
    updateAStack,
    getSpecificStack,
    createAStack
};
