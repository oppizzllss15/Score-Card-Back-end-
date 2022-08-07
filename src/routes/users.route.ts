var express = require("express");
var router = express.Router();
const { protect } = require("../middlewares/authenticate")
const {
  loginUser,
  logoutUser,
  userProfile,
  changeUserPhoneNumber,
  userProfileImage,
  getScores
} = require("../controllers/users.controller");
const {storage} = require("../services/uploads")
import multer from "multer";
const uploads = multer({storage})

router.get("/profile", protect, userProfile);
router.post("/login", loginUser);
router.get('/logout', logoutUser);
router.post("/upload", protect, uploads.single("file"), userProfileImage);
router.post("/change/phone", protect, changeUserPhoneNumber);
router.get("/getscores/:id",protect, getScores);

module.exports = router;