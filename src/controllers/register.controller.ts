import { NextFunction, Request, Response } from "express";

import registerFacade from "@/facades/register.facade";
import { STATUS_CODES } from "@/utils/constants";

class RegisterController {
	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await registerFacade.register()).status(STATUS_CODES.OK);
	}
	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await registerFacade.update()).status(STATUS_CODES.OK);
	}
	async show_page(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await registerFacade.show()).status(STATUS_CODES.OK);
	}
}

export default new RegisterController();
