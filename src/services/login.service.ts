class LoginService {
	async login(): Promise<string> {
		return "OK";
	}

    async logout(): Promise<string> {
		return "OK";
	}

    async showPageLogin(): Promise<string> {
		return "OK";
	}

    async updateDataLogin(): Promise<string> {
		return "OK";
	}
}

export default new LoginService();
