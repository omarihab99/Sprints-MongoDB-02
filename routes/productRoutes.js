const express = require("express");
const {verifyToken} = require("../services/auth");
const {productValidation, putProductValidation} = require("../services/validation");
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
router.get("/", getAllProducts);
router.post("/",verifyToken, productValidation, createProduct);
router
    .route("/:id")
    .get(getProductById)
    .put(verifyToken, putProductValidation, updateProduct)
    .delete(verifyToken, deleteProduct);

module.exports = router;