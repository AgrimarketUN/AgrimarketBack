import { GenericResponse } from "@/dtos/genericResponse.dto";
import loginService from "@/services/login.service";

class LoginFacade {
	async login(): Promise<GenericResponse<string>> {
		return {
			data: await loginService.login(),
		};
	}
    async logout(): Promise<GenericResponse<string>> {
		return {
			data: await loginService.login(),
		};
	}
}

export default new LoginFacade();
