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
const { createAdmin, setdminActivationStatus, deleteAdmin, getAdmin, updateAdmin, } = require("../controllers/admin.controller");
const { createSuperUser, changePassword, superUserProfileImage, getSuperAdminProfile, viewAllAdmins, logoutSuperAdmin, resetSuperAdminPassGetPage, resetSuperAdminPass, viewAdmins } = require("../controllers/superadmin.controller");
const { loginUser, registerUser, getAllDevs, updateUser, activateUser, deactivateUser, deleteUser, calScore, getScores, forgotUserPassword } = require("../controllers/users.controller");
// Super Admin
router.post("/create", createSuperUser);
router.post("/login", loginUser);
router.get("/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.get("/profile", superAdminProtect, getSuperAdminProfile);
router.get("/all/admin", superAdminProtect, viewAllAdmins);
router.get("/reset/password/:id/:ticket", resetSuperAdminPassGetPage);
router.post("/reset/password/:id/:ticket", resetSuperAdminPass);
router.post("/forgot/password", forgotUserPassword);
router.post("/upload", superAdminProtect, uploads.single("file"), superUserProfileImage);
router.get("/superuser/viewAdmins", viewAdmins);
// Users
router.get("/all/devs", superAdminProtect, getAllDevs);
router.post("/user/create", superAdminProtect, registerUser);
router.put("/user/update/:id", superAdminProtect, updateUser);
router.delete("/user/delete/:id", superAdminProtect, deleteUser);
router.get("/user/deactivate/:id", superAdminProtect, deactivateUser);
router.get("/user/activate/:id", superAdminProtect, activateUser);
router.post("/user/calculate/score/:id", superAdminProtect, calScore);
router.get("/user/getscores/:id", superAdminProtect, getScores);
// Stacks
router.get("/stacks", superAdminProtect, viewAllStacks);
router.get("/adminstack", stacksShield2, viewAdminStack);
router.post("/createstack", superAdminProtect, createStack);
router.post("/editstack/:id", superAdminProtect, editStack);
router.post("/deletestack/:id", superAdminProtect, deleteStack);
router.put("/addStack/:id", superAdminProtect, addStackToAdmin);
// Admins
router.get("/admin/:adminId", superAdminProtect, getAdmin);
router.post("/admin/create", superAdminProtect, createAdmin);
router.put("/admin/update/:adminId", superAdminProtect, updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put("/admin/status/:action/:adminId", superAdminProtect, setdminActivationStatus);
module.exports = router;
