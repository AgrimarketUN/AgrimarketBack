import { NextFunction, Request, Response } from "express";

import loginFacade from "@/facades/login.facade";
import { STATUS_CODES } from "@/utils/constants";

class LoginController {
	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await loginFacade.login()).status(STATUS_CODES.OK);
	}

    async logout(req: Request, res: Response, next: NextFunction): Promise<void>{
        res.json(await loginFacade.logout()).status(STATUS_CODES.OK);
    }
}

export default new LoginController();
