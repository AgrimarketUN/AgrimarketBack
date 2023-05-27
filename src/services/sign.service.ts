import "dotenv/config";

import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";

class LoginService {
	//Login
	async login(email: string, password: string): Promise<string> {
		await databaseFacade.compareDB(email, password);
		const payload = {
			email: email,
		};
		const token = this.genToken(payload);
		return token;
	}

	public genToken(payload: JwtPayload): string {
		const options = {
			expiresIn: "30 mins",
		};
		return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, options);
	}

	public verifyToken(authorizationHeader: string): boolean {
		const token = authorizationHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error) => {
			if (error) {
				throw new Error("Invalid token");
			}
		});
		return true;
	}
}

export default new LoginService();
