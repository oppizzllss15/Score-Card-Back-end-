var express = require("express");
var router = express.Router();
const { protect } = require("../middlewares/authenticate");
const {
  loginUser,
  logoutUser,
  userProfile,
  changeUserPhoneNumber,
  userProfileImage,
  getScores,
  forgotUserPassword,
  resetUserPassGetPage,
  resetUserPass,
  getUserPerformance,
  getUserCummulatives,
} = require("../controllers/users.controller");
const { storage } = require("../utils/upload");
import multer from "multer";
const uploads = multer({ storage });

router.get("/profile", protect, userProfile);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/upload", protect, uploads.single("file"), userProfileImage);
router.post("/change/phone", protect, changeUserPhoneNumber);
router.get("/reset/password/:id/:ticket", resetUserPassGetPage);
router.get("/score/tracker/:userId", protect, getUserPerformance);
router.post("/reset/password/:id/:ticket", resetUserPass);
router.post("/forgot/password", forgotUserPassword);
router.get("/getscores/:id", protect, getScores);
router.get("/cummulatives/:userId", getUserCummulatives);
router.get("/performance/:userId", getUserCummulatives);

module.exports = router;
