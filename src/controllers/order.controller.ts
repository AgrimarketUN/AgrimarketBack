import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import { STATUS_CODES } from "@/utils/constants";

class OrderController {
	async getOrders(req: Request, res: Response): Promise<void> {
		try {
			const query = await databaseFacade.getOrders();
			res
				.json({
					Orders: query,
					msg: "Orders successfully found",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					msg: "Orders not found",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async buyProduct(req: Request, res: Response): Promise<void> {
		try {
			res.json({
				msg: "Product bought",
			});
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new OrderController();
