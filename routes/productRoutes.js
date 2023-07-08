const express = require("express");
const {verifyToken} = require("../services/auth");

const {
    getAllProductsController,
    createProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
} = require("../controllers/productController");
const router = express.Router();
router.get("/", getAllProductsController);
router.post("/", createProductController);
router
    .route("/:id")
    .get(getProductByIdController)
    .patch(updateProductController)
    .delete(deleteProductController);

module.exports = router;