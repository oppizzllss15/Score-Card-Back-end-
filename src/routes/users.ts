const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { createStack, editStack } = require("../controllers/users");

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome!" });
});

router.post("/createStack", createStack);
router.post("/editStack:id", editStack);


module.exports = router;
