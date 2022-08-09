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
  viewStack,
  stacksShield,
  stacksShield2,
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
  logoutSuperAdmin,
  viewAdmins
} = require("../controllers/superadmin.controller");
const {
  registerUser,
  updateUser,
  deactivateUser,
  deleteUser,
  calScore,
  getScores,
} = require("../controllers/users.controller");

router.post("/superuser/create", createSuperUser);
router.post("/superuser/login", superUserLogin);
router.get("/superuser/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.post("/upload", superAdminProtect, uploads.single("file"), superUserProfileImage);
router.get("/superuser/viewAdmins",viewAdmins);

router.post("/user/create", superAdminProtect, registerUser);
router.post("/user/update/:id", superAdminProtect, updateUser);
router.get("/user/delete/:id", superAdminProtect, deleteUser);
router.post("/user/deactivate", superAdminProtect, deactivateUser);
router.post("/user/calculate/score/:id", superAdminProtect, calScore);
router.get("/user/getscores/:id", superAdminProtect, getScores);

router.get("/stacks", stacksShield, viewAllStacks);
router.get("/stack", stacksShield2, viewStack);
router.post("/createstack", superAdminProtect, createStack);
router.post("/editstack/:id", superAdminProtect, editStack);
router.post("/deletestack/:id", superAdminProtect, deleteStack);

//functions on admin
router.get("/admin/:adminId", superAdminProtect,  getAdmin);
router.post("/admin/create", superAdminProtect,  createAdmin);
router.put("/admin/update/:adminId", adminProtect,  updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put("/admin/deactivate/:adminId/:action", superAdminProtect, setdminActivationStatus );

module.exports = router;
