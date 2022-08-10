"use strict";
const express = require('express');
const router = express.Router();
const { registerUser } = require("../controllers/users.controller");
router.post('/create', registerUser);
module.exports = router;
