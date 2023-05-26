import "dotenv/config";

import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { ReviewInput, ReviewOutput } from "@/models/reviews";

class ReviewService {
	async createReview(payload: ReviewInput, token: string): Promise<ReviewOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		payload.userId = (await databaseFacade.findEmail(decoded.email)).id;
		const review = await databaseFacade.createReview(payload);
		return review;
	}

	async deleteReview(id: string, token: string): Promise<ReviewOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const review = await databaseFacade.deleteReview(+id, userId);
		return review;
	}
}

export default new ReviewService();
