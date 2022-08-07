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
} = require("../controllers/stackController");

router.get("/Stacks", viewAllStacks);
router.post("/createStack", createStack);
router.post("/editStack/:id", editStack);
router.post("/deleteStack/:id", deleteStack);

router.post("/superuser/create", createSuperUser);
router.post("/superuser/login", superUserLogin);
router.post("/change/password", superAdminProtect, changePassword);

module.exports = router;
