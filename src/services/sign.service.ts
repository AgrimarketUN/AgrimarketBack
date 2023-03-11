import "dotenv/config";

import jwt from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";

class LoginService {
	//Login
	async login(correo: string, contrasena: string): Promise<any> {
		if (await databaseFacade.compareDB(correo, contrasena)) {
			const payload = {
				correo: correo,
			};
			const token = this.genToken(payload);

			return {
				token,
				msg: "Tokencito",
			};
		} else {
			return "BAD";
		}
	}

	public genToken(payload: any): string {
		const options = {
			expiresIn: "30 mins",
		};
		return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, options);
	}

	public verifyToken(authorizationHeader: string): boolean {
		const token = authorizationHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error) => {
			if (error) {
				throw new Error("El token no es valido");
			}
		});
		return true;
	}
}

export default new LoginService();
