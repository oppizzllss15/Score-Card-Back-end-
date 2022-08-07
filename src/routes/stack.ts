import { Router } from "express";
import { addStack } from "../controllers";
import {
  activateAdmin,
  createAdmin,
  deactivateAdmin,
  deleteAdmin,
  updateAdmin,
} from "../controllers/adminController";

const stackRouter = Router();
stackRouter.post("/create", addStack);
module.exports = stackRouter