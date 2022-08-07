"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const stackRouter = (0, express_1.Router)();
stackRouter.post("/create", controllers_1.addStack);
module.exports = stackRouter;
