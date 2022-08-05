const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deactivateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);
router.post("/deactivate", deactivateUser);

module.exports = router;
