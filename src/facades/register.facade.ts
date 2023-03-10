import { GenericResponse } from "@/dtos/genericResponse.dto";
import registerService from "@/services/register.service";

class RegisterFacade {
	async register(): Promise<GenericResponse<string>> {
		return {
			data: await registerService.register(),
		};
	}
}

export default new RegisterFacade();
