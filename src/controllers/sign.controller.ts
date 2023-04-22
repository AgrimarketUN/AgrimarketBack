import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import signService from "@/services/sign.service";
import { STATUS_CODES } from "@/utils/constants";

class RegisterController {
	async register(req: Request, res: Response): Promise<void> {
		const { firstname, lastname, email, password } = req.body;
		try {
			res.json(await databaseFacade.createUser(firstname, lastname, email, password))
				.status(STATUS_CODES.CREATED);
		} catch (error) {
			res
				.json({
					"error": error,
					msg: "No se pudo completar el registro :(",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;
		res.json(await signService.login(email, password)).status(STATUS_CODES.OK);
	}

	async show_page(req: Request, res: Response): Promise<void> {
		res.json().status(STATUS_CODES.OK);
	}
}

export default new RegisterController();
