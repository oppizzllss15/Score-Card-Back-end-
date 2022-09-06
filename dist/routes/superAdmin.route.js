"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { superAdminProtect, adminProtect, } = require("../middlewares/authenticate");
const { storage } = require("../utils/upload");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
const { createStack, editStack, deleteStack, addStackToAdmin, viewAdminStack, viewAllStacks, stacksShield, stacksShield2, } = require("../controllers/stack.controller");
const { createAdmin, setdminActivationStatus, deleteAdmin, getAdmin, updateAdmin, viewAdmins } = require("../controllers/admin.controller");
const { createSuperUser, changePassword, superUserProfileImage, getSuperAdminProfile, viewAllAdmins, logoutSuperAdmin, resetSuperAdminPassGetPage, resetSuperAdminPass } = require("../controllers/superadmin.controller");
const { loginUser, registerUser, getAllDevs, updateUser, activateUser, deactivateUser, deleteUser, calScore, getScores, filterScores, forgotUserPassword, getAllDevsByStackId, editScores } = require("../controllers/users.controller");
// Super Admin
router.post("/create", createSuperUser);
router.post("/login", loginUser);
router.get("/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.get("/profile", superAdminProtect, getSuperAdminProfile);
router.get("/reset/password/:id/:ticket", resetSuperAdminPassGetPage);
router.post("/reset/password/:id/:ticket", resetSuperAdminPass);
router.post("/forgot/password", forgotUserPassword);
router.post("/upload", superAdminProtect, uploads.single("file"), superUserProfileImage);
router.get("/superuser/viewAdmins", viewAdmins);
// Users
router.get("/all/admin", superAdminProtect, viewAllAdmins);
router.get("/all/devs", adminProtect, getAllDevs);
router.get("/all/devs/:stackId", getAllDevsByStackId);
router.post("/user/create", adminProtect, registerUser);
router.put("/user/update/:id", adminProtect, updateUser);
router.delete("/user/delete/:id", adminProtect, deleteUser);
router.get("/user/deactivate/:id", adminProtect, deactivateUser);
router.get("/user/activate/:id", adminProtect, activateUser);
router.put("/user/calculate/score/:id", adminProtect, calScore);
router.get("/user/getscores/:weekId", adminProtect, filterScores);
router.put("/user/editscoreweek/:id", adminProtect, editScores);
// Stacks
router.get("/stacks", adminProtect, viewAllStacks);
router.post("/createstack", superAdminProtect, createStack);
router.post("/editstack/:id", superAdminProtect, uploads.single("file"), editStack);
router.post("/deletestack/:id", superAdminProtect, deleteStack);
router.put("/addStack/:id", superAdminProtect, addStackToAdmin);
// Admins
router.get("/admin/:adminId", superAdminProtect, getAdmin);
router.get("/all/admin", superAdminProtect, viewAdmins);
router.post("/admin/create", superAdminProtect, createAdmin);
router.put("/admin/update/:adminId", updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put("/admin/status/:action/:adminId", superAdminProtect, setdminActivationStatus);
module.exports = router;
