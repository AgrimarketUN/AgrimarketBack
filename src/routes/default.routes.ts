import express from "express";

import defaultController from "@/controllers/default.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

//Register routes
router.get("", asyncErrorMiddleware(defaultController.default));

export default router;
