var express = require("express");
var router = express.Router();
const {
  createAdmin,
  setdminActivationStatus,
  deleteAdmin,
  getAdmin,
  updateAdmin,
  loginAdmin
} = require("../controllers/adminController");

const {
  createSuperUser,
  superUserLogin,
  changePassword,
  superUserProfileImage,
  logoutSuperAdmin,
} = require("../controllers/superuser.controller");
const {
  registerUser,
  updateUser,
  deactivateUser,
  deleteUser,
  calScore,
  getScores,
} = require("../controllers/users.controller");
const { superAdminProtect, adminProtect } = require("../middlewares/authenticate");
const {storage} = require("../services/uploads")
import multer from "multer";
const uploads = multer({storage})

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

//functons on admin
router.post("/admin/login", loginAdmin);
router.get("/admin/:adminId", superAdminProtect,  getAdmin);
router.post("/admin/create", superAdminProtect,  createAdmin);
router.put("/admin/update/:adminId", adminProtect,  updateAdmin);
router.delete("/admin/delete/:adminId", superAdminProtect, deleteAdmin);
router.put("/admin/deactivate/:adminId/:action", superAdminProtect, setdminActivationStatus );

module.exports = router;
