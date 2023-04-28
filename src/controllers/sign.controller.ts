import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import signService from "@/services/sign.service";
import { STATUS_CODES } from "@/utils/constants";

class RegisterController {
	async register(req: Request, res: Response): Promise<void> {
		try {
			const payload = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
				phone: req.body.phone,
				address: req.body.address,
			};
			const user = await databaseFacade.createUser(payload);
			res
				.json({
					user,
					msg: "User created",
				})
				.status(STATUS_CODES.CREATED);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "There was an error creating the user",
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
