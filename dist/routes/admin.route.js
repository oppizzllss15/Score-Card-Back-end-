"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const { adminProtect } = require("../middlewares/authenticate");
const { loginAdmin, adminProfileImage, adminProfile } = require("../controllers/admin.controller");
const { storage } = require("../utils/upload");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
router.get("/profile", adminProtect, adminProfile);
router.post("/login", loginAdmin);
router.post("/upload", adminProtect, uploads.single("file"), adminProfileImage);
module.exports = router;
//  adminProtect,