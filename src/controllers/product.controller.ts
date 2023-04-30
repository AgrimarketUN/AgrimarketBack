import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import { ProductInput } from "@/models/product";
import checkRequiredFields from "@/utils/checkfields";
import { STATUS_CODES } from "@/utils/constants";

class ProductController {
	async getProducts(req: Request, res: Response): Promise<void> {
		try {
			const query = await databaseFacade.getProducts();
			res
				.json({
					Products: query,
					msg: "Products successfully found",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					msg: "Products not found",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async createProduct(req: Request, res: Response): Promise<void> {
		try {
			checkRequiredFields(["name", "price", "availableQuantity", "unit", "categoryId", "storeId"], req.body);
			const payload: ProductInput = {
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				image: req.body.image,
				origin: req.body.origin,
				expiryDate: req.body.expiryDate,
				harvestDate: req.body.harvestDate,
				availableQuantity: req.body.availableQuantity,
				unit: req.body.unit,
				weight: req.body.weight,
				cultivationMethod: req.body.cultivationMethod,
				organicCertifications: req.body.organicCertifications,
				categoryId: req.body.categoryId,
				storeId: req.body.storeId,
			};
			const product = await databaseFacade.createProduct(payload);
			if (product != null) {
				res
					.json({
						product,
						msg: "Product created",
					})
					.status(STATUS_CODES.CREATED);
			} else {
				res
					.json({
						msg: "Failed to create product",
					})
					.status(STATUS_CODES.BAD_REQUEST);
			}
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}

	async updateProduct(req: Request, res: Response): Promise<void> {
		try {
			const payload: ProductInput = {
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				image: req.body.image,
				origin: req.body.origin,
				expiryDate: req.body.expiryDate,
				harvestDate: req.body.harvestDate,
				availableQuantity: req.body.availableQuantity,
				unit: req.body.unit,
				weight: req.body.weight,
				cultivationMethod: req.body.cultivationMethod,
				organicCertifications: req.body.organicCertifications,
				categoryId: req.body.categoryId,
				storeId: req.body.storeId,
			};
			const product = await databaseFacade.updateProduct(payload, req.params.id);
			res
				.json({
					product,
					msg: "Update Product",
				})
				.status(STATUS_CODES.CREATED);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}

	async findProduct(req: Request, res: Response): Promise<void> {
		try {
			checkRequiredFields(["type", "parameter"], req.body);
			const { type, parameter } = req.body;
			const query = await databaseFacade.findProductBy(type, parameter);
			if (query == undefined || query.length == 0) {
				throw new Error("No items were found");
			}
			res
				.json({
					Products: query,
					msg: "Products successfully found",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		try {
			const query = await databaseFacade.deleteProduct(id);
			if (query == undefined || query == 0) {
				throw new Error("No items were found to delete");
			}
			res
				.json({
					"Product ": query,
					msg: "Delete Product Success",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}
}

export default new ProductController();
