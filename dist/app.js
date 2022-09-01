"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('morgan');
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const { connectDB } = require('./database/db');
connectDB();
const usersRouter = require('./routes/users.route');
const adminRouter = require('./routes/admin.route');
const superAdminRouter = require('./routes/superAdmin.route');
const app = express();
app.use((0, cors_1.default)());
app.use(logger('dev'));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/admin', adminRouter);
app.use('/superadmin', superAdminRouter);
=======
app.use('/admin', superAdminRouter);
>>>>>>> main
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).json({ message: "page not found" });
    next();
});
exports.default = app;
