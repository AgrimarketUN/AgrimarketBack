import express from "express";

import productController from "@/controllers/product.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
//import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/get", asyncErrorMiddleware(productController.getProducts));
router.post("/create", asyncErrorMiddleware(productController.createProduct));

export default router;
