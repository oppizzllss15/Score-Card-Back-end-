"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('morgan');
require('dotenv').config();
const { connectDB } = require('./database/db');
connectDB();
<<<<<<< HEAD
const usersRouter = require('./routes/users');
=======
const usersRouter = require('./routes/users.route');
>>>>>>> opeyemi
const adminRouter = require('./routes/admin.route');
const superAdminRouter = require('./routes/superAdmin.route');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/superadmin', superAdminRouter);
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).json({ message: "page not found" });
    next();
});
exports.default = app;
