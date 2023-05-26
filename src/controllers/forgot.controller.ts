import { Request, Response } from "express";

import forgotService from "@/services/forgot.service";
import checkRequiredFields from "@/utils/checkfields";
import { STATUS_CODES } from "@/utils/constants";

class ForgotController {
	async forgotPassRequest(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		try {
			await forgotService.sendEmailForgot(email);
			res
				.json({
					msg: "Email sent successfully!",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		try {
			checkRequiredFields(["password", "confirmPassword"], req.body);
			const token = req.query.t as string;
			const newPass1 = req.body.password;
			const newPass2 = req.body.confirmPassword;
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
