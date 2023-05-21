import "dotenv/config";

import databaseFacade from "@/facades/database.facade";

class UserService{
    async userProfile(id: string): Promise<void> {
		await databaseFacade.findUser(id);
	}
}

export default new UserService();
