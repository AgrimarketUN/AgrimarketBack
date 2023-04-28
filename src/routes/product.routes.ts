import express from "express";

import productController from "@/controllers/product.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

router.get("/get", asyncErrorMiddleware(productController.getProducts));
router.post("/create", asyncErrorMiddleware(productController.createProduct));
router.post("/find", asyncErrorMiddleware(productController.findProduct));
router.put("/update/:id", asyncErrorMiddleware(productController.updateProduct));
router.delete("/delete/:id", asyncErrorMiddleware(productController.deleteProduct));

export default router;
