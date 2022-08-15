var express = require("express");
var router = express.Router();
const { adminProtect } = require("../middlewares/authenticate")
const {
    loginAdmin,
    logoutAdmin,
    adminProfileImage,
    adminProfile
<<<<<<< HEAD
} = require("../controllers/admin.controller");
  

const { filterScores, getScoresByName, calScore, getScores } = require("../controllers/users.controller");
=======
  } = require("../controllers/admin.controller");
  const {
    viewStack,
    stacksShield2,
  } = require("../controllers/stack.controller");
const { filterScores, getScoresByName } = require("../controllers/users.controller");
>>>>>>> create-admin
const {storage} = require("../utils/upload")
import multer from "multer";
const uploads = multer({storage})

router.get("/profile", adminProtect, adminProfile);
router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin)
router.get("/stack", stacksShield2, viewStack);
router.post("/upload", adminProtect, uploads.single("file"), adminProfileImage);
router.get("/stack", adminProtect, viewStack);

// User routes
router.get("/scores/:id", adminProtect, getScores);
router.get("/user/filterscores/:weekId", filterScores);
router.post("/user/addscore", adminProtect, calScore);
router.post("/user/score/name", getScoresByName);

module.exports = router;
