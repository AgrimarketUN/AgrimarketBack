import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import forgotService from "@/services/forgot.service";
import { STATUS_CODES } from "@/utils/constants";

class ForgotController {
	async forgotPass(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		if (await databaseFacade.findEmail(email)) {
			const token = await forgotService.forgot(email);
			res.json(await forgotService.sendEmailForgot(email, token)).status(STATUS_CODES.OK);
		} else {
			res.json("El correo no existe").status(STATUS_CODES.NOT_FOUND);
		}
	}
}

export default new ForgotController();
