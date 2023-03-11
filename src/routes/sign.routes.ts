import express from "express";

import signController from "@/controllers/sign.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

//Register routes
router.post("/register", asyncErrorMiddleware(signController.register));

//Login routes
router.get("/", asyncErrorMiddleware(signController.login));
//router.get("/logout", asyncErrorMiddleware(signController.logout));
router.post("/login", asyncErrorMiddleware(signController.login));

export default router;
