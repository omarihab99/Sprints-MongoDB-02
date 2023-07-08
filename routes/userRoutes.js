const express = require('express');
const {userLogin, userRegister} = require('../services/validation');
const {verifyToken} = require('../services/auth');
const {
    userLoginController,
    userRegisterController,
  userBuyProductController,
} = require('../controllers/userController');
const router = express.Router();
router.post('/login', userLogin, userLoginController);
router.post('/register', userRegister, userRegisterController);
router.post('/users/:userid/products/:productid',verifyToken, userBuyProductController) // TODO: handle buy product endpoint.
module.exports = router;