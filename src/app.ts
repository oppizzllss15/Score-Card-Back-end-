const express = require('express');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('morgan');
import cors from "cors"
require('dotenv').config();
import { Request, Response, NextFunction} from 'express';
const { connectDB } = require('./database/db');
connectDB();

const usersRouter = require('./routes/users.route');
const adminRouter = require('./routes/admin.route');
const superAdminRouter = require('./routes/superAdmin.route');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/admin', superAdminRouter);
app.use(errorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({message: "page not found"})
  next();
});

export default app;