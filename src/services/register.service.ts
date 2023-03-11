class RegisterService {
	async register(): Promise<string> {
		return "Register user";
	}
	async update(): Promise<string> {
		return "Update user";
	}
	async show(): Promise<string> {
		return "Show page";
	}
}

export default new RegisterService();
