import express from "express";

import reviewController from "@/controllers/review.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";

const router = express.Router();

router.get("/get/:id", asyncErrorMiddleware(reviewController.getReviews));
router.post("/create/:id", asyncErrorMiddleware(reviewController.createReview));
router.delete("/delete/:id", asyncErrorMiddleware(reviewController.deleteReview));

export default router;
