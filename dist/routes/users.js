"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const { protect } = require("../middlewares/authenticate");
const { loginUser, userProfile, changeUserPhoneNumber, userProfileImage } = require("../controllers/users.controller");
const { storage } = require("../services/uploads");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
router.get("/profile", protect, userProfile);
router.post("/login", loginUser);
router.post("/upload", protect, uploads.single("file"), userProfileImage);
router.post("/change/phone", protect, changeUserPhoneNumber);
module.exports = router;
