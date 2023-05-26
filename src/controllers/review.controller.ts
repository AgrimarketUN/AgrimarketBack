import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import { ReviewInput } from "@/models/reviews";
import reviewService from "@/services/review.service";
import checkRequiredFields from "@/utils/checkfields";
import { STATUS_CODES } from "@/utils/constants";

class ReviewController {
	async getReviews(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const reviews = await databaseFacade.getReviews(id);
			res.json({ reviews, msg: "Reviews retrieved" }).status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error getting reviews",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async createReview(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const token = req.headers.authorization;
			checkRequiredFields(["text", "rating"], req.body);
			const payload: ReviewInput = {
				text: req.body.text,
				rating: req.body.rating,
				userId: 0,
				productId: +id,
			};
			const review = await reviewService.createReview(payload, token as string);
			res
				.json({
					review,
					msg: "Review created",
				})
				.status(STATUS_CODES.CREATED);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error creating review",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async deleteReview(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const token = req.headers.authorization;
			const review = await reviewService.deleteReview(id, token as string);
			res
				.json({
					review,
					msg: "Review deleted",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error deleting review",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new ReviewController();
