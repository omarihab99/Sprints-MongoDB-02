const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../services/productServices");

const getAllProductsController = async (req, res) => {
  try {
    const result = await getAllProducts();
    const {statusCode, data, message} = result;
    console.log(message);
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const createProductController = async (req, res) => {
  try {
    const product = req.body;
    const result = await createProduct(product);
    const {statusCode, message} = result;
    res.status(statusCode).json(message);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getProductByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getProductById(id);
    const {statusCode, data, message} = result;
    console.log(message);
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const result = await updateProduct(id, product);
    const {statusCode, message} = result;
    res.status(statusCode).json(message);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteProduct(id);
    const {statusCode, message} = result;
    res.status(statusCode).json(message);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllProductsController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
