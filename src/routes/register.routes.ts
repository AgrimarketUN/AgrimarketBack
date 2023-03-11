import express from "express";

import registerController from "@/controllers/register.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

router.get("/", asyncErrorMiddleware(registerController.show_page));
router.post("/", asyncErrorMiddleware(registerController.register));
router.put("/:id", asyncErrorMiddleware(registerController.update));

export default router;
