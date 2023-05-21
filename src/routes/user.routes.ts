import express from "express";

import userController from "@/controllers/user.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/profile/:id", authMiddleware, asyncErrorMiddleware(userController.profileUser));
router.put("/updateProfile/:id", authMiddleware, asyncErrorMiddleware(userController.updateUser));

export default router;
