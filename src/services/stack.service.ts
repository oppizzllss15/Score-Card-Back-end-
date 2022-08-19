const Stacks = require("../models/stack");
const SuperUser = require("../models/superAdmin.model");
const Admins = require("../models/admin.model");
const devs = require("../models/user.model");

const getUserStack = async (id: string) => {
  const stackName = await Stacks.findById(id);
  return stackName.name;
};

const getSpecificStack = async (id: string) => {
  const stack = await Stacks.find({ _id: id });
  return stack;
};

const getAdminUser = async (id: string) => {
  const adminUser = await Admins.findOne({ _id: id });
  return adminUser;
};

const getSpecificAdmin = async (id: string) => {
  const admin = Admins.findById(id);
  return admin;
};

const getMultipleAdmins = async (id: string) => {
  const multipleAdmins = await Admins.find({ stack: id });
  return multipleAdmins;
};

const getSuperAdminUser = async (id: string) => {
  const superUser = await SuperUser.findOne({ _id: id });
  return superUser;
};

const getAllStacks = async () => {
  const allStacks = await Stacks.find({}, { _id: 0, __v: 0 });
  return allStacks;
};

const deleteAStack = async (id: string) => {
  const removeStack = await Stacks.findOneAndRemove({ _id: id });
  return removeStack;
};

const updateAStack = async (id: string, input: {}) => {
  const updInput = await Stacks.findByIdAndUpdate(id, input, {
    new: true,
  });
  return updInput;
};

const updateAdminStack = async (id: string, stack: string) => {
  const update = await Admins.updateOne({ _id: id }, { $set: { stack } });
  return update;
};

const addAnotherStackToAdmin = async (id: string, stack: string) => {
  const addedStack = await Admins.updateOne(
    { _id: id },
    {
      $push: {
        stack,
      },
    }
  );
  return addedStack;
};

const deleteDevs = async (id: string) => {
  const deletedDevs = await devs.deleteMany({ stack: id });
  return deleteDevs;
};
const deleteAnAdmin = async (id: string) => {
  const removeAdmin = await Admins.deleteOne({ stack: id });
  return removeAdmin;
};
const createAStack = async (body: {}) => {
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
  createAStack,
  getMultipleAdmins,
  deleteAnAdmin,
  updateAdminStack,
  deleteDevs,
  getSpecificAdmin,
  addAnotherStackToAdmin
};
