const express = require('express');
const {userLogin, userRegister} = require('../services/validation');
const {
    userLoginController,
    userRegisterController
} = require('../controllers/userController');
const router = express.Router();
router.post('/login', userLogin, userLoginController);
router.post('/register', userRegister, userRegisterController);
module.exports = router;