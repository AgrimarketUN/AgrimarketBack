import express from "express";

import signController from "@/controllers/sign.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

//Register routes
router.post("/register", asyncErrorMiddleware(signController.register));

//Login routes
router.get("/", authMiddleware, asyncErrorMiddleware(signController.show_page));
//router.get("/logout", asyncErrorMiddleware(signController.logout));
router.post("/login", asyncErrorMiddleware(signController.login));

export default router;
