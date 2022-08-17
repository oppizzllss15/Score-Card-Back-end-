"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const { protect } = require("../middlewares/authenticate");
const { loginUser, logoutUser, userProfile, changeUserPhoneNumber, userProfileImage, getScores, getUserCummulatives, updateUserPasword, } = require("../controllers/users.controller");
const { storage } = require("../utils/upload");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
router.get("/profile", protect, userProfile);
router.post("/login", loginUser);
router.get('/logout', logoutUser);
router.post("/upload", protect, uploads.single("file"), userProfileImage);
router.post("/change/phone", protect, changeUserPhoneNumber);
router.get("/getscores/:id", protect, getScores);
router.get("/cummulatives/:userId", protect, getUserCummulatives);
router.get("/performance/:userId", protect, getUserCummulatives);
router.post("/update/password", protect, updateUserPasword);
module.exports = router;
