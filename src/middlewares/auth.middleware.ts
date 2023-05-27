import { NextFunction, Request, Response } from "express";

import token from "@/services/sign.service";
import { STATUS_CODES } from "@/utils/constants";

export default (req: Request, res: Response, next: NextFunction) => {
	{
		const auth = req.headers.authorization;
		if (auth === null) {
			res
				.json({
					msg: "Autorization token not found",
				})
				.status(STATUS_CODES.NOT_FOUND);
		}

		try {
			token.verifyToken(auth as string);
			next();
		} catch (error) {
			res
				.json({
					msg: "Invalid token",
				})
				.status(STATUS_CODES.UNAUTHORIZED);
		}
	}
};
