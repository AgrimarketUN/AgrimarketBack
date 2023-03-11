import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import registerFacade from "@/facades/register.facade";
import User from "@/models/users";
import { STATUS_CODES } from "@/utils/constants";

class RegisterController {
	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { nombre, apellido, correo, contrasena, direccion, telefono } =
			req.body;
		const salt = bcryptjs.genSaltSync();
		const usuario = await User.create({
			nombre: nombre,
			apellido: apellido,
			correo: correo,
			contrasena: bcryptjs.hashSync(contrasena, salt),
			direccion: direccion,
			telefono: telefono,
		});
		res.json(await registerFacade.register()).status(STATUS_CODES.OK);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await registerFacade.update()).status(STATUS_CODES.OK);
	}

	async show_page(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		res.json(await registerFacade.show()).status(STATUS_CODES.OK);
	}
}

export default new RegisterController();
