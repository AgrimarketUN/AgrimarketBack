import "dotenv/config";

import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import User from "@/models/users";
import send_email from "@/utils/sendEmail";

class ForgotService {
	key = <string>process.env.SENDGRID_API_KEY;

	async forgot(email: string): Promise<any> {
		if ((await databaseFacade.findEmail(email)) != null) {
			const payload = {
				email: email,
			};
			const token = this.genPassToken(payload);
			return token;
		}
	}

	public genPassToken(payload: any): string {
		const options = {
			expiresIn: "30 mins",
		};
		return jwt.sign(payload, process.env.RESET_PASS_KEY as string, options);
	}

	async sendEmailForgot(email: string, token: any): Promise<any> {
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

	async resetPass(token: any, pass1: string) {
		const salt = bcrypt.genSaltSync();
		const email = <JwtPayload>jwt.decode(token);
		const user = await databaseFacade.findEmail(email.email);
		if (user != null) {
			await User.update(
				{ password: bcrypt.hashSync(pass1, salt) },
				{
					where: {
						email: email.email,
					},
				}
			);
			return "Password changed successfully!";
		} else {
			return "Incorrect or expired password token";
		}
	}
}

export default new ForgotService();
