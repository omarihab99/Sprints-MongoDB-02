const {createHash} = require('crypto');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const logger = require('../logger');
const userLogger = logger.userLogger;
const Product = require('../models/productModel');
const jwt = require('jsonwebtoken');
dotenv.config();
const hash = (password) => {return createHash("sha256").update(password).digest("hex")};
const userLoginService = (email, password) => {
  const user = users.find((user) => user.email === email);
  if(!user){
    userLogger.userLoginFailed();
    return {message: 'User not found', code: 404};
  }
  if(hash(password) !== user.password){
    userLogger.userLoginFailed();
    return {message: 'Password incorrect', code: 401};
  }
  const token = jwt.sign(user, process.env.JWT_SECRET);
  userLogger.userLoginSuccess();
  return {message: 'User logged in successfully', code: 200, token: token};
}


const userRegisterService = (email, password) => {
  
  try{
    const hashedPassword = hash(password);
    const user = users.find((user) => user.email === email);
    if(user){
      userLogger.userRegisterFailed();
      return {message: 'User already exists', code: 409};
    }
    users.push({
      email,
      password: hashedPassword,
    });
    console.log(users);
    userLogger.userRegisterSuccess();
    return {message:'User registered successfully', code: 201};
  }
  catch(error){
    userLogger.userRegisterFailed();
  }
  
}

const userBuyProductService = async (userid, productid) => {
  const product = await Product.findById(productid);
  if(!product) return {message: 'Product out of stock', statusCode: 404};
  // Complete this function
  
}
module.exports = {userRegisterService, userLoginService, userBuyProductService};