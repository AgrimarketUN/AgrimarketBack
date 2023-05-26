import "dotenv/config";

import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import send_email from "@/utils/sendEmail";

class ForgotService {
	async sendEmailForgot(email: string): Promise<void> {
		await databaseFacade.findEmail(email);
		const payload = {
			email: email,
		};
		const token = this.genPassToken(payload);
		const html = `
            <div>
            <h1>Hello, you activated the reset password function</h1>
            <p>Please click the following link to reset your password.</p>
            <p>If you didn't ask for a password reset, please ignore this message.</p>
            <a href="${process.env.DOMAIN}/restorePassword?t=${token}">Reset Password</a>
        </div>`;

		const subject = "Reset Password Link";

		send_email(email, subject, html);
	}

	public genPassToken(payload: JwtPayload): string {
		const options = {
			expiresIn: "30 mins",
		};
		return jwt.sign(payload, process.env.RESET_PASS_KEY as string, options);
	}

	async resetPass(token: string, password: string): Promise<void> {
		const email = <JwtPayload>jwt.decode(token);
		await databaseFacade.updatePassword(email.email, password);
	}
}

export default new ForgotService();
