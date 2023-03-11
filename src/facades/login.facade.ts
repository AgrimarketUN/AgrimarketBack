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
			data: await loginService.logout(),
		};
	}
    async showPageLogin(): Promise<GenericResponse<string>> {
		return {
			data: await loginService.showPageLogin(),
		};
	}
    async updateDataLogin(): Promise<GenericResponse<string>> {
		return {
			data: await loginService.updateDataLogin(),
		};
	}
}

export default new LoginFacade();
