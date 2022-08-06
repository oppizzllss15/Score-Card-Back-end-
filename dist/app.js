"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('morgan');
require('dotenv').config();
const { connectDB } = require('./database/db');
connectDB();
const usersRouter = require('./routes/users');
<<<<<<< HEAD
const adminRouter = require("./routes/admin");
const stackRouter = require("./routes/stack");
=======
const superAdminRouter = require('./routes/superAdmin.route');
>>>>>>> origin/develop
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use("/admin", adminRouter);
app.use("/stack", stackRouter);
=======
app.use('/admin', superAdminRouter);
app.use(errorHandler);
>>>>>>> origin/develop
app.use((req, res, next) => {
    res.status(404).json({ message: "page not found" });
    next();
});
exports.default = app;
