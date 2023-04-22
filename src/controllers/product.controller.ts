import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import { ProductInput } from "@/models/product";
import { STATUS_CODES } from "@/utils/constants";

class ProductController {
	async getProducts(req: Request, res: Response): Promise<void> {
		try {
			const query = await databaseFacade.getProducts();
			res
				.json({
					"productos ": query,
					msg: "Productos obtenidos",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error,
					msg: "No se pudo obtener los productos",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async createProduct(req: Request, res: Response): Promise<void> {
		try {
			const payload : ProductInput = {
				name : req.body.name,
				description : req.body.description,
				price : req.body.price,
				image : req.body.image,
				origin : req.body.origin,
				expiryDate : req.body.expiryDate,
				harvestDate : req.body.harvestDate,
				availableQuantity : req.body.availableQuantity,
				unit : req.body.unit,
				weight : req.body.weight,
				cultivationMethod : req.body.cultivationMethod,
				organicCertifications : req.body.organicCertifications,
				categoryId : req.body.categoryId,
				storeId : req.body.storeId
			}
			const product = await databaseFacade.createProduct( payload);
			if (product != null) {
				res
					.json({
						product,
						msg: "Producto creado :)",
					})
					.status(STATUS_CODES.CREATED);
			} else {
				res
					.json({
						msg: "No se pudo crear el producto :(",
					})
					.status(STATUS_CODES.BAD_REQUEST);
			}
		} catch (error) {
			res
				.json({
					error,
					msg: "Error en el servidor",
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}

	async findProduct(req: Request, res: Response): Promise<void> {
		const { type, parameter } = req.body;
		try {
			const query = await databaseFacade.findProductBy(type, parameter);
			res
				.json({
					"productos ": query,
					msg: "Productos obtenidos",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error,
					msg: "No se pudo obtener los productos",
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}
}

export default new ProductController();
