const {userRegisterService, userLoginService} = require('../services/userServices');
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
  const { email, password, _ } = req.body;
  const result = userRegisterService(email, password);
  res.status(result.code).json(result.message);
};

module.exports = {userRegisterController, userLoginController};