const express = require('express');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('morgan');
require('dotenv').config();
import { Request, Response, NextFunction} from 'express';
const { connectDB } = require('./database/db');
connectDB();
const { errorHandler } = require("./middlewares/errorHandler")

const usersRouter = require('./routes/users');
const superAdminRouter = require('./routes/superAdmin.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/admin', superAdminRouter);
app.use(errorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({message: "page not found"})
  next();
});

export default app;