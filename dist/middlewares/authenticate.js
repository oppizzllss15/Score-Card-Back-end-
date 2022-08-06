"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminModel = require('../models/superAdmin.model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.Token;
    if (token) {
        try {
            if (process.env.JWT_SECRET) {
                await jwt.verify(token, process.env.JWT_SECRET);
                next();
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            await jwt.verify(token, process.env.JWT_SECRET);
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
const superAdminProtect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.Token;
    console.log(token);
    if (token) {
        try {
            if (process.env.SECRET_PASS) {
                await jwt.verify(token, process.env.SECRET_PASS);
                const user = await AdminModel.find();
                if (user[0].secret === process.env.SECRET_PASS) {
                    next();
                }
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized as Admin');
        }
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            await jwt.verify(token, process.env.SECRET_PASS);
            const user = await AdminModel.find();
            if (user[0].secret === process.env.SECRET_PASS) {
                next();
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized as Super User');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Provide token for authentication");
    }
});
module.exports = { protect, superAdminProtect };
