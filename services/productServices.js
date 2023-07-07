const Product = require("../models/productModel");
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products
      ? { statusCode: 200, data: products, message: "Products found." }
      : { statusCode: 404, data: null, message: "Products not found." };
  } catch (error) {
    return { statusCode: 400, data: null, message: error.message };
  }
};
const createProduct = async (product) => {
  try {
    await Product.create(product);
    return { statusCode: 201, message: "Product created." };
  } catch (error) {
    return { statusCode: 400, message: error.message };
  }
};
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product
      ? { statusCode: 200, data: product, message: "Product found." }
      : { statusCode: 404, data: null, message: "Product not found." };
  } catch (error) {
    return { statusCode: 400, data: null, message: error.message };
  }
};
const updateProduct = async (id, product) => {
  try {
    const result = await Product.findByIdAndUpdate(id, product, { new: true });
    if (result.matchedCount === 1 && result.modifiedCount === 1)
      return { statusCode: 200, message: "Product updated." };
    else if (result.matchedCount === 0)
      return { statusCode: 404, message: "Product not found." };
    return { statusCode: 400, message: "Error updating product." };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};
const deleteProduct = async (id) => {
  try {
    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount === 1)
      return { statusCode: 200, message: "Product deleted." };
    else if (result.deletedCount === 0)
      return { statusCode: 404, message: "Product not found." };
    return { statusCode: 400, message: "Error deleting product." };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};
module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
