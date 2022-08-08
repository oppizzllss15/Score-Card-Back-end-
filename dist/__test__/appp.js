"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const session = require('express-session')
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const express = require('express');
const IndexRouter = require('./routes/index');
const UserRouter = require('./routes/users');
const AdminRouter = require('./routes/admin');
const app = express();
// view engine setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    app.locals.myname = "ugonna ume";
    next();
});
//app.use(express.session({secret: "authorssite"}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', IndexRouter);
app.use('/users', UserRouter);
app.use('/admin', AdminRouter);
;
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
const apper = app.listen(3001, () => { console.log("listening"); });
module.exports = apper;
