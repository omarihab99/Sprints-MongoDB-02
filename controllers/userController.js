const {
  userRegisterService,
  userLoginService,
  userBuyProductService,
  updateUserInfoService,
  deleteUserInfoService,
} = require("../services/userServices");
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await userLoginService({ email, password });
  if (result.token) {
    res
      .status(result.statusCode)
      .json({ token: result.token, message: result.message });
  } else {
    res.status(result.statusCode).json(result.message);
  }
};
const userRegisterController = async (req, res) => {
  try {
    const { name, email, password, _ } = req.body;
    const result = await userRegisterService({ name, email, password });
    res.status(result.statusCode).json(result.message);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const userBuyProductController = async (req, res) => {
  try {
    const userId = req.params.userid;
    const productId = req.params.productid;
    const result = await userBuyProductService(userId, productId);
    res.status(result.statusCode).json(result.message);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateUserInfoController = async(req,res)=>{
  try {
    const userInfo = req.body;
    const userId = req.params.userid;
    const result = await updateUserInfoService(userId, userInfo);
    res.status(result.statusCode).json(result.message);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
const deleteUserInfoController = async(req,res)=>{
  try {
    const userId = req.params.userid;
    const result = await deleteUserInfoService(userId);
    res.status(result.statusCode).json(result.message);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
module.exports = {
  userRegisterController,
  userLoginController,
  userBuyProductController,
  updateUserInfoController,
  deleteUserInfoController,
};
