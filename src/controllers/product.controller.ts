import { NextFunction, Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
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
		const {
			nombre_producto,
			descripcion_producto,
			precio,
			imagen_producto,
			categoria,
			origen,
			fecha_cosecha,
			fecha_caducidad,
			cantidad_disponible,
			unidad_medida,
			peso_por_unidad,
			metodo_cultivo,
			certificaciones_organicas,
			vendedor,
		} = req.body;
		try {
			const product = await databaseFacade.createProduct(
				nombre_producto,
				descripcion_producto,
				precio,
				imagen_producto,
				categoria,
				origen,
				fecha_cosecha,
				fecha_caducidad,
				cantidad_disponible,
				unidad_medida,
				peso_por_unidad,
				metodo_cultivo,
				certificaciones_organicas,
				vendedor
			);
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

	async findProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { tipo, parametro } = req.body;
		try {
			const query = await databaseFacade.findProductBy(tipo, parametro);

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
