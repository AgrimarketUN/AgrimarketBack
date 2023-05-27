import "dotenv/config";

import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { OrderInput, OrderOutput } from "@/models/orders";

class OrderService {
	async getOrder(token: string): Promise<OrderOutput[]> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const id = (await databaseFacade.findEmail(decoded.email)).id;
		const orders = await databaseFacade.getMyOrders(id);
		return orders;
	}

	async buyProduct(payload: OrderInput, token: string): Promise<OrderOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		payload.userId = (await databaseFacade.findEmail(decoded.email)).id;

		// Is viable buy product by quantity?
		const product = await databaseFacade.getProduct(payload.productId.toString());
		if (product.availableQuantity < payload.quantity) {
			throw new Error("Not enough products");
		}
		await databaseFacade.updateProductQuantity(product.availableQuantity - payload.quantity, payload.productId.toString());

		const query = await databaseFacade.buyProduct(payload);
		return query;
	}
}

export default new OrderService();
