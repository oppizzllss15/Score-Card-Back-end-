"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
var express = require("express");
var router = express.Router();
const { createAdmin, setdminActivationStatus, deleteAdmin, getAdmin, updateAdmin } = require("../controllers/admin.controller");
const { createSuperUser, superUserLogin, changePassword, superUserProfileImage, logoutSuperAdmin, } = require("../controllers/superuser.controller");
const { registerUser, updateUser, deactivateUser, deleteUser, calScore, getScores, } = require("../controllers/users.controller");
=======
const express = require("express");
const router = express.Router();
>>>>>>> opeyemi
const { superAdminProtect, adminProtect } = require("../middlewares/authenticate");
const { storage } = require("../utils/upload");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
const { createStack, editStack, deleteStack, viewAllStacks, viewStack, stacksShield, stacksShield2, } = require("../controllers/stack.controller");
const { createAdmin, setdminActivationStatus, deleteAdmin, getAdmin, updateAdmin } = require("../controllers/admin.controller");
const { createSuperUser, superUserLogin, changePassword, superUserProfileImage, logoutSuperAdmin, } = require("../controllers/superadmin.controller");
const { registerUser, updateUser, deactivateUser, deleteUser, calScore, getScores, } = require("../controllers/users.controller");
router.post("/superuser/create", createSuperUser);
router.post("/superuser/login", superUserLogin);
router.get("/superuser/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.post("/upload", superAdminProtect, uploads.single("file"), superUserProfileImage);
router.post("/user/create", superAdminProtect, registerUser);
router.post("/user/update/:id", superAdminProtect, updateUser);
router.get("/user/delete/:id", superAdminProtect, deleteUser);
router.post("/user/deactivate", superAdminProtect, deactivateUser);
router.post("/user/calculate/score/:id", superAdminProtect, calScore);
router.get("/user/getscores/:id", superAdminProtect, getScores);
<<<<<<< HEAD
=======
router.get("/stacks", stacksShield, viewAllStacks);
router.get("/stack", stacksShield2, viewStack);
router.post("/createstack", superAdminProtect, createStack);
router.post("/editstack/:id", superAdminProtect, editStack);
router.post("/deletestack/:id", superAdminProtect, deleteStack);
>>>>>>> opeyemi
//functions on admin
router.get("/admin/:adminId", superAdminProtect, getAdmin);
router.post("/admin/create", superAdminProtect, createAdmin);
router.put("/admin/update/:adminId", adminProtect, updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put("/admin/deactivate/:adminId/:action", superAdminProtect, setdminActivationStatus);
module.exports = router;
