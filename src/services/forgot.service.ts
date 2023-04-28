import "dotenv/config";

import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import User from "@/models/users";
import send_email from "@/utils/sendEmail";

class ForgotService {
	key = process.env.SENDGRID_API_KEY;

	async sendEmailForgot(email: string): Promise<void> {
		const payload = {
			email: email,
		};
		const token = this.genPassToken(payload);
		const html = `
            <div>
            <h1>Hello, you activated the reset password function</h1>
            <p>Please click the following link to reset your password.</p>
            <p>If you didn't ask for a password reset, please ignore this message.</p>
            <a href="${process.env.DOMAIN}/forgot/resetPassword?t=${token}">Reset Password</a>
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

	async resetPass(token: string, pass1: string): Promise<void> {
		const salt = bcrypt.genSaltSync();
		const email = <JwtPayload>jwt.decode(token);
		await databaseFacade.findEmail(email.email);
		await User.update(
			{ password: bcrypt.hashSync(pass1, salt) },
			{
				where: {
					email: email.email,
				},
			}
		);
	}
}

export default new ForgotService();
