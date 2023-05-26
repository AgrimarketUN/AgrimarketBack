import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { CartItemInput, CartItemOutput } from "@/models/cartItems";

class CartService {
	async getCart(id: string, token: string): Promise<CartItemOutput[]> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const cart = await databaseFacade.getCart(+id, userId);
		return cart;
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

	async deleteFromCart(id: string, token: string): Promise<CartItemOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const userId = (await databaseFacade.findEmail(decoded.email)).id;
		const cart = await databaseFacade.deleteFromCart(+id, userId);
		return cart;
	}
}

export default new CartService();
