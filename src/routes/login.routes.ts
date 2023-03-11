import express from "express";

import loginController from "@/controllers/login.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

router.get("/", asyncErrorMiddleware(loginController.login));
router.get("/logout", asyncErrorMiddleware(loginController.logout))

router.post("/", asyncErrorMiddleware(loginController.login));

router.put("/", asyncErrorMiddleware(loginController.login))

export default router;
