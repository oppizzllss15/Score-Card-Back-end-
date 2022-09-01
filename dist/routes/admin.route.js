"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const { adminProtect } = require("../middlewares/authenticate");
const { logoutAdmin, adminProfileImage, adminProfile, resetAdminPassGetPage, resetAdminPass, } = require("../controllers/admin.controller");
const { viewStack, stacksShield2 } = require("../controllers/stack.controller");
const { loginUser, filterScores, getScoresByName, forgotUserPassword } = require("../controllers/users.controller");
const { storage } = require("../utils/upload");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
router.get("/profile/:adminId", adminProfile);
router.post("/login", loginUser);
router.get("/logout", logoutAdmin);
router.get("/stack", stacksShield2, viewStack);
router.post("/upload", uploads.single("file"), adminProfileImage);
router.get("/stack", adminProtect, viewStack);
router.get("/reset/password/:id/:ticket", resetAdminPassGetPage);
router.post("/reset/password/:id/:ticket", resetAdminPass);
router.post("/forgot/password", forgotUserPassword);
// User routes
router.get("/user/filterscores/:weekId", filterScores);
router.post("/user/score/name", getScoresByName);
module.exports = router;
// , stacksShield2,
