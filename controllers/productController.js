const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../services/productServices");

const getAllProducts = (req, res) => {
  try {
    const result = getAllProducts();
    const {statusCode, data, message} = result;
    console.log(message);
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const createProduct = (req, res) => {
  try {
    const product = req.body;
    const result = createProduct(product);
    const {statusCode, message} = result;
    res.status(statusCode).json(message);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getProductById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = getProductById(id);
    const {statusCode, data, message} = result;
    console.log(message);
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = req.body;
    const result = updateProduct(id, product);
    const {statusCode, message} = result;
    res.status(statusCode).json(message);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const deleteProduct = (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = deleteProduct(id);
    const {statusCode, message} = result;
    res.status(statusCode).json(message);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
