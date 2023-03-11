import { NextFunction, Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import signService from "@/services/sign.service";
import { STATUS_CODES } from "@/utils/constants";

class RegisterController {
	//Register
	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { nombre, apellido, correo, contrasena, direccion, telefono } = req.body;
		if (await databaseFacade.createUser(nombre, apellido, correo, contrasena, direccion, telefono)) {
			res
				.json({
					msg: "Registro completado :)",
				})
				.status(STATUS_CODES.CREATED);
		} else {
			res
				.json({
					msg: "No se pudo completar el registro :(",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	// Login
	async login(req: Request, res: Response): Promise<void> {
		const { correo, contrasena } = req.body;

		res.json(await signService.login(correo, contrasena)).status(STATUS_CODES.OK);
	}

	async show_page(req: Request, res: Response): Promise<void> {
		res.json().status(STATUS_CODES.OK);
	}
}

export default new RegisterController();
