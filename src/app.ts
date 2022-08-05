const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
import { Request, Response, NextFunction} from 'express';
import { HttpError } from 'http-errors';
const { connectDB } = require('./database/db');
connectDB();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require("./routes/admin");
const stackRouter = require("./routes/stack");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/admin", adminRouter);
app.use("/stack", stackRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});


app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send("Error: " + `${err.message}`)
});

export default app;