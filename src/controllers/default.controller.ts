import { Request, Response } from "express";

import { STATUS_CODES } from "@/utils/constants";

class defaultController {
	async default(req: Request, res: Response): Promise<void> {
		res.json().status(STATUS_CODES.OK);
	}
}

export default new defaultController();
