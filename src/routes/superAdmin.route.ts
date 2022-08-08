const express = require("express");
const router = express.Router();
const {
  createSuperUser,
  superUserLogin,
  changePassword,
  
} = require("../controllers/superuser.controller");
const { superAdminProtect } = require("../middlewares/authenticate");
const {
  createStack,
  editStack,
  deleteStack,
  viewAllStacks,
  viewStack,
  stacksShield,
  stacksShield2,
} = require("../controllers/stackController");

router.get("/Stacks", stacksShield, viewAllStacks);
router.get("/Stack", stacksShield2, viewStack);
router.post("/createStack", superAdminProtect, createStack);
router.post("/editStack/:id", superAdminProtect, editStack);
router.post("/deleteStack/:id", superAdminProtect, deleteStack);

router.post("/superuser/create", createSuperUser);
router.post("/superuser/login", superUserLogin);
router.post("/change/password", superAdminProtect, changePassword);

module.exports = router;
