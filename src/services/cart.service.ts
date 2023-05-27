import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { CartItemInput, CartItemOutput } from "@/models/cartItems";

class CartService {
	async getCart(token: string): Promise<{ [key: number]: number}> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const cart = await databaseFacade.getCart(userId);
		const dictcart: { [key: number]: number } = {};
		for (const item of cart) {
			dictcart[item.productId] = item.quantity;
		}
		return dictcart;
	}

	async addToCart(id: string, token: string, quantity: number): Promise<CartItemOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const payload: CartItemInput = {
			productId: +id,
			userId: userId,
			quantity: +quantity,
		};
		const cart = await databaseFacade.addToCart(payload);
		return cart;
	}

	async buyCart(token: string): Promise<void> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const cart = await databaseFacade.getCart(userId);
		// comprove stock of each product
		for (const item of cart) {
			const product = await databaseFacade.getProduct(item.productId);
			if (product.availableQuantity < item.quantity) {
				throw new Error("Not enough stock of \"" + product.name + "\" to buy");
			}
		}
		// buy each product
		for (const item of cart) {
			const payload = {
				productId: item.productId,
				userId: userId,
				quantity: item.quantity,
			};
			await databaseFacade.buyProduct(payload);
			await databaseFacade.deleteFromCart(item.productId, userId);
		}
	}

	async deleteFromCart(id: string, token: string): Promise<CartItemOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const cart = await databaseFacade.deleteFromCart(+id, userId);
		return cart;
	}
}

export default new CartService();
