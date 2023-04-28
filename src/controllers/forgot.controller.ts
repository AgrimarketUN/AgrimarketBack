import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import forgotService from "@/services/forgot.service";
import { STATUS_CODES } from "@/utils/constants";

class ForgotController {
	async forgotPassRequest(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		try {
			await databaseFacade.findEmail(email);
			res.json(await forgotService.sendEmailForgot(email)).status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const token = req.query.token as string;
		const newPass1 = req.body.newpass1;
		const newPass2 = req.body.newpass2;
		try {
			if (newPass1 == newPass2) {
				await forgotService.resetPass(token, newPass1);
				res
					.json({
						msg: "Password changed successfully!",
					})
					.status(STATUS_CODES.OK);
			} else {
				res
					.json({
						msg: "Passwords do not match",
					})
					.status(STATUS_CODES.BAD_REQUEST);
			}
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new ForgotController();
