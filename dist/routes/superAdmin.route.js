"use strict";
var express = require('express');
var router = express.Router();
const { createSuperUser, superUserLogin, changePassword, } = require('../controllers/superuser.controller');
const { superAdminProtect } = require('../middlewares/authenticate');
router.post('/superuser/create', createSuperUser);
router.post('/superuser/login', superUserLogin);
router.post('/change/password', superAdminProtect, changePassword);
module.exports = router;
