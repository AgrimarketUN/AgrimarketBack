import databaseFacade from "@/facades/database.facade";

class LoginService {
	//Login
	async login(correo: string, contrasena: string): Promise<string> {
		if (await databaseFacade.compareDB(correo, contrasena)) {
			return "OK";
		} else {
			return "BAD";
		}
	}
	async logout(): Promise<string> {
		return "OK";
	}
}

export default new LoginService();
