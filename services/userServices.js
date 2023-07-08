const { createHash } = require("crypto");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
dotenv.config();
const hash = (password) => createHash("sha256").update(password).digest("hex");
const userLoginService = async (userInfo) => {
  try {
    const { email, password } = userInfo;
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found", statusCode: 404 };
    }
    if (hash(password) !== user.password) {
      return { message: "Password incorrect", statusCode: 401 };
    }
    const token = jwt.sign(userInfo, process.env.JWT_SECRET);
    return {
      message: "User logged in successfully",
      statusCode: 200,
      token: token,
    };
  } catch (error) {
    return { message: error.message, statusCode: 400 };
  }
};

const userRegisterService = async (userInfo) => {
  try {
    const { name, email, password } = userInfo;
    const hashedPassword = hash(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { message: "User registered successfully", statusCode: 201 };
  } catch (error) {
    if (error.message == "Validation Error") {
      return {
        message: "User with this email already exists",
        statusCode: 400,
      };
    }
    return { message: error.message, statusCode: 400 };
  }
};

const userBuyProductService = async (userid, productid) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(userid) ||
      !mongoose.Types.ObjectId.isValid(productid)
    )
      return { statusCode: 400, message: "Invalid ID." };
    const user = await User.findById(userid);
    const product = await Product.findById(productid);
    if (!user) {
      return { message: "User not found", statusCode: 404 };
    }
    if (!product) {
      return { message: "Product not found", statusCode: 404 };
    }
    if (user.boughtProducts.find((item) => item == productid)) {
      return { message: "Product already bought", statusCode: 400 };
    }
    user.boughtProducts.push(productid);
    await user.save();
    return { message: "Product bought successfully", statusCode: 200 };
  } catch (error) {
    return { message: error.message, statusCode: 400 };
  }
};
const updateUserInfoService = async (userid, userInfo) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userid))
      return { statusCode: 400, message: "Invalid ID." };
    const user = await User.findByIdAndUpdate(userid, userInfo, {
      new: true,
    });
    if (!user) {
      return { message: "User not found", statusCode: 404 };
    }
    return { message: "User updated successfully", statusCode: 200 };
  } catch (error) {
    return { message: error.message, statusCode: 400 };
  }
};
const deleteUserInfoService = async (userid) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userid))
      return { statusCode: 400, message: "Invalid ID." };
    const user = await User.findByIdAndRemove(userid);
    if (!user) {
      return { message: "User not found", statusCode: 404 };
    }
    return { message: "User deleted successfully", statusCode: 200 };
  } catch (error) {
    return { message: error.message, statusCode: 400 };
  }
};
module.exports = {
  userRegisterService,
  userLoginService,
  userBuyProductService,
  updateUserInfoService,
  deleteUserInfoService,
};
