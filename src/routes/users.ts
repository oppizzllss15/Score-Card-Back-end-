var express = require("express");
var router = express.Router();
const { protect} = require("../middlewares/authenticate")
const {
  registerUser,
  loginUser,
  updateUser,
  deactivateUser,
  deleteUser,
  userProfile,
  changeUserPhoneNumber
} = require("../controllers/users.controller");

router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);
router.post("/deactivate", deactivateUser);
router.get("/profile", protect, userProfile);
router.post("/change/phone", protect, changeUserPhoneNumber);

module.exports = router;
