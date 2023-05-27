import { Request, Response } from "express";

import { OrderInput } from "@/models/orders";
import orderService from "@/services/order.service";
import checkRequiredFields from "@/utils/checkfields";
import { STATUS_CODES } from "@/utils/constants";

class OrderController {
	async getOrders(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization;
			const query = await orderService.getOrder(token as string);
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
			checkRequiredFields(["productId", "quantity"], req.body);
			const token = req.headers.authorization;
			const payload: OrderInput = {
				productId: req.body.productId,
				quantity: req.body.quantity,
			};
			const query = await orderService.buyProduct(payload, token as string);
			res.json({
				Order: query,
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
