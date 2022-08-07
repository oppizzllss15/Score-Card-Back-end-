const asyncHandler = require("express-async-handler");
const Stacks = require("../models/stack");
import express, { Request, Response, NextFunction } from "express";

const viewAllStacks = asyncHandler(async (req: Request, res: Response) => {
  const allStacks = await Stacks.find({}, {_id: 0, __v: 0});

  res.status(200).json({
    status: "Success",
    message: {
      allStacks,
    },
  });
  return;
});

const createStack = asyncHandler(async (req: Request, res: Response) => {
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

const editStack = asyncHandler(async (req: Request, res: Response) => {
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

const deleteStack = asyncHandler(async (req: Request, res: Response) => {
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
  viewAllStacks
};
