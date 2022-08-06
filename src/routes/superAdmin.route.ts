var express = require('express');
var router = express.Router();
const { createSuperUser, superUserLogin, changePassword, logoutSuperAdmin } = require('../controllers/superuser.controller')
const {
    registerUser,
    updateUser,
    deactivateUser,
    deleteUser
  } = require("../controllers/users.controller");
const { superAdminProtect } = require('../middlewares/authenticate')

router.post('/superuser/create', createSuperUser);
router.post('/superuser/login', superUserLogin);
router.get('/superuser/logout', logoutSuperAdmin);
router.post('/change/password', superAdminProtect, changePassword);
router.post("/user/create", superAdminProtect, registerUser);
router.post("/user/update/:id", superAdminProtect, updateUser);
router.post("/user/delete/:id", superAdminProtect, deleteUser);
router.post("/user/deactivate", superAdminProtect, deactivateUser);

module.exports = router;