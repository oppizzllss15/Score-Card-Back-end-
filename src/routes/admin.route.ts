var express = require("express");
var router = express.Router();
const { adminProtect } = require("../middlewares/authenticate")
const {
    loginAdmin,
    adminProfileImage,
    adminProfile
  } = require("../controllers/admin.controller");
const {storage} = require("../utils/upload")
import multer from "multer";
const uploads = multer({storage})

router.get("/profile", adminProtect, adminProfile);
router.post("/login", adminProtect, loginAdmin);
router.post("/upload", adminProtect, uploads.single("file"), adminProfileImage);

module.exports = router;