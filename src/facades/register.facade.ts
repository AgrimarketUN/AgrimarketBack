import { GenericResponse } from "@/dtos/genericResponse.dto";
import registerService from "@/services/register.service";

class RegisterFacade {
	async register(): Promise<GenericResponse<string>> {
		return {
			data: await registerService.register(),
		};
	}

	async update(): Promise<GenericResponse<string>> {
		return {
			data: await registerService.update(),
		};
	}

	async show(): Promise<GenericResponse<string>> {
		return {
			data: await registerService.show(),
		};
	}
}

export default new RegisterFacade();
