import databaseFacade from "@/facades/database.facade";
import { StoreInput, StoreOutput } from "@/models/stores";

class StoreService {
	async createStore(payload: StoreInput, email: string): Promise<StoreOutput> {
		payload.userId = (await databaseFacade.findEmail(email)).id;
		const store = await databaseFacade.createStore(payload);
		await databaseFacade.updateisSeller(email, true);
		return store;
	}
}

export default new StoreService();
