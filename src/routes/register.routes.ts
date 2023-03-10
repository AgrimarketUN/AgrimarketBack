import express from "express";

import registerController from "@/controllers/register.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

router.get("/", asyncErrorMiddleware(registerController.register));

export default router;
