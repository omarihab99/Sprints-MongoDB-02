const express = require("express");
const { userLogin, userRegister } = require("../services/validation");
const { verifyToken } = require("../services/auth");
const {
  userLoginController,
  userRegisterController,
  userBuyProductController,
  updateUserInfoController,
  deleteUserInfoController,
} = require("../controllers/userController");
const router = express.Router();
router.post("/login", userLogin, userLoginController);
router.post("/register", userRegister, userRegisterController);
router.post(
  "/:userid/products/:productid",
  verifyToken,
  userBuyProductController
);
router
  .route("/:userid")
  .patch(verifyToken, updateUserInfoController)
  .delete(verifyToken, deleteUserInfoController);
module.exports = router;
