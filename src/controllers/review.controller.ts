import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
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
		res.json({ msg: "Review created" });
	}

	async deleteReview(req: Request, res: Response): Promise<void> {
		res.json({ msg: "Review deleted" });
	}
}

export default new ReviewController();
