"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const { adminProtect } = require("../middlewares/authenticate");
<<<<<<< HEAD
const { loginAdmin, adminProfileImage, adminProfile } = require("../controllers/admin.controller");
const { filterScores, getScoresByName, calScore, getScores } = require("../controllers/users.controller");
=======
const { loginAdmin, logoutAdmin, adminProfileImage, adminProfile } = require("../controllers/admin.controller");
const { viewStack, stacksShield2, } = require("../controllers/stack.controller");
const { filterScores, getScoresByName } = require("../controllers/users.controller");
>>>>>>> create-admin
const { storage } = require("../utils/upload");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
router.get("/profile", adminProtect, adminProfile);
router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);
router.get("/stack", stacksShield2, viewStack);
router.post("/upload", adminProtect, uploads.single("file"), adminProfileImage);
router.get("/stack", adminProtect, viewStack);
// User routes
router.get("/scores/:id", adminProtect, getScores);
router.get("/user/filterscores/:weekId", filterScores);
router.post("/user/addscore", adminProtect, calScore);
router.post("/user/score/name", getScoresByName);
module.exports = router;
