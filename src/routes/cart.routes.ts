import express from "express";

import cartController from "@/controllers/cart.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/get", authMiddleware, asyncErrorMiddleware(cartController.getCart));
router.post("/add/:id", authMiddleware, asyncErrorMiddleware(cartController.addToCart));
router.post("/update/:id", authMiddleware, asyncErrorMiddleware(cartController.updateCart));
router.delete("/delete/:id", authMiddleware, asyncErrorMiddleware(cartController.deleteFromCart));
router.get("/buy", authMiddleware, asyncErrorMiddleware(cartController.buyCart));

export default router;
