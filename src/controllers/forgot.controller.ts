import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import forgotService from "@/services/forgot.service";
import { STATUS_CODES } from "@/utils/constants";

class ForgotController {
	async forgotPassRequest(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		if ((await databaseFacade.findEmail(email)) != null) {
			const token = await forgotService.forgot(email);
			res.json(await forgotService.sendEmailForgot(email, token)).status(STATUS_CODES.OK);
		} else {
			res.json("Email doesn't exist").status(STATUS_CODES.NOT_FOUND);
		}
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const token = req.query.t;
		const newPass1 = req.body.newpass1;
		const newPass2 = req.body.newpass2;

		if (newPass1 == newPass2) {
			res.json(await forgotService.resetPass(token, newPass1)).status(STATUS_CODES.OK);
		} else {
			res.json("Passwords do not match").status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new ForgotController();
