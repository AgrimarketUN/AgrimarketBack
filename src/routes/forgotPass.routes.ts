import express from "express";

import forgotController from "@/controllers/forgot.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

// Forgot Password routes
router.post("/password", asyncErrorMiddleware(forgotController.forgotPassRequest));
router.put("/resetPassword", asyncErrorMiddleware(forgotController.resetPassword));

export default router;
