const { asyncHandler } = require("express-async-handler");
const { Stacks } = require("../models/stack");
import express, { Request, Response, NextFunction } from "express";

const createStack = asyncHandler(async (req: Request, res: Response) => {
  const { name, image } = req.body;

  const newStack = await Stacks.create({
    name,
    image,
  });

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

  const stack = await Stacks.findOne(id);

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

module.exports = {
  createStack,
  editStack,
};
