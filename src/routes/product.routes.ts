import express from "express";

import productController from "@/controllers/product.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/get", asyncErrorMiddleware(productController.getProducts));
// filter by name, category, store, etc..
router.post("/find", asyncErrorMiddleware(productController.findProduct));
// obtain product by id
router.get("/:id", asyncErrorMiddleware(productController.getProduct));
// routes only for authenticated sellers
router.post("/create", authMiddleware, asyncErrorMiddleware(productController.createProduct));
router.put("/update/:id", authMiddleware, asyncErrorMiddleware(productController.updateProduct));
router.delete("/delete/:id", authMiddleware, asyncErrorMiddleware(productController.deleteProduct));
router.get("/getprodsell", authMiddleware, asyncErrorMiddleware(productController.getProductBySeller));

export default router;
