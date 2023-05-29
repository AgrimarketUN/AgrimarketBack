import { Request, Response } from "express";

import cartService from "@/services/cart.service";
import checkRequiredFields from "@/utils/checkfields";
import { STATUS_CODES } from "@/utils/constants";

class CartController {
	async getCart(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization;
			const cart = await cartService.getCart(token as string);
			res
				.json({
					cart,
					msg: "Cart retrieved",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error getting cart",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async addToCart(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const token = req.headers.authorization;
			checkRequiredFields(["quantity"], req.body);
			const cart = await cartService.addToCart(id, token as string, req.body.quantity);
			res
				.json({
					cart,
					msg: "Product added to cart",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error adding product to cart",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async updateCart(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const token = req.headers.authorization;
			checkRequiredFields(["quantity"], req.body);
			const cart = await cartService.updateCart(id, token as string, req.body.quantity);
			res
				.json({
					cart,
					msg: "Cart updated",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error updating cart",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async deleteFromCart(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const token = req.headers.authorization;
			const cart = await cartService.deleteFromCart(id, token as string);
			res
				.json({
					cart,
					msg: "Product deleted from cart",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error deleting product from cart",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async buyCart(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization;
			await cartService.buyCart(token as string);
			res
				.json({
					msg: "Cart bought",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error buying cart",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new CartController();
