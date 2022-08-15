const express = require("express");
const router = express.Router();
const { superAdminProtect, adminProtect } = require("../middlewares/authenticate");
const {storage} = require("../utils/upload")
import multer from "multer";
const uploads = multer({storage})

const {
  createStack,
  editStack,
  deleteStack,
  viewAllStacks,
  stacksShield
} = require("../controllers/stack.controller");

const {
  createAdmin,
  setdminActivationStatus,
  deleteAdmin,
  getAdmin,
  updateAdmin
} = require("../controllers/admin.controller");

const {
  createSuperUser,
  superUserLogin,
  changePassword,
  superUserProfileImage,
  getSuperAdminProfile,
  viewAllAdmins,
  logoutSuperAdmin,
} = require("../controllers/superadmin.controller");
const {
  registerUser,
  updateUser,
  deactivateUser,
  deleteUser,
  calScore,
  getScores,
} = require("../controllers/users.controller");


router.post("/create", createSuperUser);
router.post("/login", superUserLogin);
router.get("/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.get("/profile", superAdminProtect, getSuperAdminProfile);
router.get("/all/admin", superAdminProtect, viewAllAdmins);
router.post("/upload", superAdminProtect, uploads.single("file"), superUserProfileImage);

router.post("/user/create", superAdminProtect, registerUser);
router.post("/user/update/:id", superAdminProtect, updateUser);
router.get("/user/delete/:id", superAdminProtect, deleteUser);
router.post("/user/deactivate", superAdminProtect, deactivateUser);
router.post("/user/calculate/score/:id", superAdminProtect, calScore);
router.get("/user/getscores/:id", superAdminProtect, getScores);

router.get("/stacks", stacksShield, viewAllStacks);
router.post("/createstack", superAdminProtect, createStack);
router.post("/editstack/:id", superAdminProtect, editStack);
router.post("/deletestack/:id", superAdminProtect, deleteStack);

router.get("/admin/:adminId", superAdminProtect,  getAdmin);
router.post("/admin/create",superAdminProtect,  createAdmin);
router.put("/admin/update/:adminId", superAdminProtect,  updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put(
  "/admin/status/:action/:adminId",superAdminProtect,
  setdminActivationStatus
);

module.exports = router;
