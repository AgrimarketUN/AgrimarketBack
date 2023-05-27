import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { StoreInput, StoreOutput } from "@/models/stores";

class StoreService {
	async createStore(payload: StoreInput, token: string): Promise<StoreOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		payload.userId = (await databaseFacade.findEmail(decoded.email)).id;
		const store = await databaseFacade.createStore(payload);
		await databaseFacade.updateisSeller(decoded.email, true);
		return store;
	}
}

export default new StoreService();
