import "dotenv/config";

import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { UserInput, UserOutput } from "@/models/users";

class UserService {
	async userProfile(token: string): Promise<UserOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const user = await databaseFacade.findEmail(decoded.email);
		return user;
	}

	async updateUser(token: string, payload: UserInput): Promise<UserOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const id = (await databaseFacade.findEmail(decoded.email)).id;
		const user = databaseFacade.updateUser(payload, id);
		return user;
	}

	async userPass(password: string, token: string): Promise<boolean> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		if (await databaseFacade.findPass(password, decoded.email)) {
			return true;
		} else {
			return false;
		}
	}
}

export default new UserService();
