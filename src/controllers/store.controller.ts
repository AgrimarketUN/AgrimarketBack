import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import storeService from "@/services/store.service";
import checkRequiredFields from "@/utils/checkfields";
import { STATUS_CODES } from "@/utils/constants";

class StoreController {
	async getStores(req: Request, res: Response): Promise<void> {
		try {
			const stores = await databaseFacade.getStores();
			res
				.json({
					stores,
					msg: "Stores retrieved",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error getting stores",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}

	async createStore(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization;
			checkRequiredFields(["name"], req.body);
			const payload = {
				name: req.body.name,
				Image: req.body.Image ? req.body.Image : null,
				userId: undefined,
			};
			const store = await storeService.createStore(payload, token as string);
			res
				.json({
					store,
					msg: "Create store",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
					msg: "Error creating store",
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new StoreController();
