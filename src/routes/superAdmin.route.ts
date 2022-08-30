const express = require("express");
const router = express.Router();
const {
  superAdminProtect,
  adminProtect,
} = require("../middlewares/authenticate");
const { storage } = require("../utils/upload");
import multer from "multer";
const uploads = multer({ storage });

const {
  createStack,
  editStack,
  deleteStack,
  addStackToAdmin,
  viewAllStacks,
  stacksShield,
} = require("../controllers/stack.controller");

const {
  createAdmin,
  setdminActivationStatus,
  deleteAdmin,
  getAdmin,
  updateAdmin,
  viewAdmins
} = require("../controllers/admin.controller");

const {
  createSuperUser,
  changePassword,
  superUserProfileImage,
  getSuperAdminProfile,
  viewAllAdmins,
  logoutSuperAdmin,
  resetSuperAdminPassGetPage,
  resetSuperAdminPass
} = require("../controllers/superadmin.controller");
const {
  loginUser,
  registerUser,
  getAllDevs,
  updateUser,
  activateUser,
  deactivateUser,
  deleteUser,
  calScore,
  getScores,
  filterScores,
  forgotUserPassword,
  editScores
} = require("../controllers/users.controller");

// Super Admin
router.post("/create", createSuperUser);
router.post("/login", loginUser);
router.get("/logout", logoutSuperAdmin);
router.post("/change/password", superAdminProtect, changePassword);
router.get("/profile", superAdminProtect, getSuperAdminProfile);
router.get("/reset/password/:id/:ticket", resetSuperAdminPassGetPage);
router.post("/reset/password/:id/:ticket", resetSuperAdminPass);
router.post("/forgot/password", forgotUserPassword);
router.post(
  "/upload",
  superAdminProtect,
  uploads.single("file"),
  superUserProfileImage
);
router.get("/superuser/viewAdmins",viewAdmins);

// Users
router.get("/all/admin", viewAllAdmins);
router.get("/all/devs", getAllDevs);
router.post("/user/create", superAdminProtect, registerUser);
router.put("/user/update/:id", superAdminProtect, updateUser);
router.delete("/user/delete/:id", superAdminProtect, deleteUser);
router.get("/user/deactivate/:id", superAdminProtect, deactivateUser);
router.get("/user/activate/:id", superAdminProtect, activateUser);
router.post("/user/calculate/score/:id", superAdminProtect, calScore);
router.get("/user/getscores/:weekId", superAdminProtect, filterScores);
router.put("/user/editscoreweek/:id", editScores);

// Stacks
router.get("/stacks", superAdminProtect, viewAllStacks);
router.post("/createstack", superAdminProtect, createStack);
router.post("/editstack/:id", superAdminProtect, uploads.single("file"), editStack);
router.post("/deletestack/:id", superAdminProtect, deleteStack);
router.put("/addStack/:id", superAdminProtect, addStackToAdmin);

// Admins
router.get("/admin/:adminId", superAdminProtect, getAdmin);
router.get("/all/admin", superAdminProtect, viewAdmins);
router.post("/admin/create", superAdminProtect, createAdmin);
router.put("/admin/update/:adminId",  updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put(
  "/admin/status/:action/:adminId",
  superAdminProtect,
  setdminActivationStatus
);

module.exports = router;

//superAdminProtect,
//superAdminProtect,