const {userRegisterService, userLoginService, userBuyProductService} = require('../services/userServices');
const userLoginController = (req, res) => {
  const { email, password } = req.body;
  const result = userLoginService(email, password);
  if(result.token){
    res.status(result.code).json({token: result.token, message: result.message});
  }
  else{
    res.status(result.code).json(result.message);
  }

};
const userRegisterController = (req, res) => {
  try{
    const { email, password, _ } = req.body;
  const result = userRegisterService(email, password);
  res.status(result.code).json(result.message);  
  }
  catch(err){
    res.status(500).json(err.message);
  }
  
};

const userBuyProductController = (req,res) => {
  try{
    const userId = parseInt(req.params.userid);
  const productId = parseInt(req.params.productid);
  const result = userBuyProductService(userId, productId);
  res.status(result.statusCode).json(result.message);  
  }
  catch(err){
    res.status(500).json(err.message);
  }
  
}
module.exports = {userRegisterController, userLoginController, userBuyProductController};