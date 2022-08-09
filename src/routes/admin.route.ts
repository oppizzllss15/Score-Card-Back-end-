var express = require("express");
var router = express.Router();
const { adminProtect } = require("../middlewares/authenticate")
const {
    loginAdmin,
    adminProfileImage,
    adminProfile
  } = require("../controllers/admin.controller");
const { filterScores, getScoresByName } = require("../controllers/users.controller");
const {storage} = require("../utils/upload")
import multer from "multer";
const uploads = multer({storage})

router.get("/profile", adminProtect, adminProfile);
router.post("/login", loginAdmin);
router.post("/upload", adminProtect, uploads.single("file"), adminProfileImage);

// User routes
router.get("/user/filterscores/:weekId", filterScores);
router.post("/user/score/name", getScoresByName);

module.exports = router;
