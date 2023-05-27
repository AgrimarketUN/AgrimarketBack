import express from "express";

import orderController from "@/controllers/order.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/get", authMiddleware, asyncErrorMiddleware(orderController.getOrders));
router.post("/buy", authMiddleware, asyncErrorMiddleware(orderController.buyProduct));

export default router;
