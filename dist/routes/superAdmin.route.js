"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
<<<<<<< HEAD
const { createSuperUser, superUserLogin, changePassword, superUserProfileImage, logoutSuperAdmin, viewAdmins } = require("../controllers/superuser.controller");
=======
const { activateAdmin, createAdmin, setdminActivationStatus, deleteAdmin, getAdmin, updateAdmin, loginAdmin } = require("../controllers/adminController");
const { createSuperUser, superUserLogin, changePassword, superUserProfileImage, logoutSuperAdmin, } = require("../controllers/superuser.controller");
>>>>>>> create-admin
const { registerUser, updateUser, deactivateUser, deleteUser, calScore, getScores, } = require("../controllers/users.controller");
const { superAdminProtect, adminProtect } = require("../middlewares/authenticate");
const { storage } = require("../services/uploads");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)({ storage });
router.post("/superuser/create", createSuperUser);
router.post("/superuser/login", superUserLogin);
router.get("/superuser/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.post("/upload", superAdminProtect, uploads.single("file"), superUserProfileImage);
router.get("/superuser/viewAdmins", viewAdmins);
router.post("/user/create", superAdminProtect, registerUser);
router.post("/user/update/:id", superAdminProtect, updateUser);
router.get("/user/delete/:id", superAdminProtect, deleteUser);
router.post("/user/deactivate", superAdminProtect, deactivateUser);
router.post("/user/calculate/score/:id", superAdminProtect, calScore);
router.get("/user/getscores/:id", superAdminProtect, getScores);
// router.get("/admin/:adminId", superAdminProtect, getAdmin);
// router.post("/admin/login", superAdminProtect, createAdmin);
//router.post("/admin/create", loginAdmin);
// router.put("/admin/update/:adminId", adminProtect, updateAdmin);
// router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
// router.put( "/admin/deactivate/:adminId/:action", superAdminProtect,setdminActivationStatus);
router.post("/admin/login", loginAdmin);
router.get("/admin/:adminId", getAdmin);
router.post("/admin/create", createAdmin);
router.put("/admin/update/:adminId", updateAdmin);
router.delete("/admin/delete/:adminId", deleteAdmin);
router.put("/admin/deactivate/:adminId/:action", setdminActivationStatus);
module.exports = router;
