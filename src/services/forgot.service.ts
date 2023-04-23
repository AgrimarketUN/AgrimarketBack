import "dotenv/config";

import sgMail from "@sendgrid/mail"
import jwt from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";


class ForgotService {

    key = <string>process.env.SENDGRID_API_KEY;

	async forgot(email: string): Promise<any> {
		if (await databaseFacade.findEmail(email)) {
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
        
        const html =  `
            <div>
            <h1>Hello, you activated the reset password function</h1>
            <p>Please click the following link to reset your password.</p>
            <p>If you didn't ask for a password reset, please ignore this message.</p>
            <a href="${process.env.DOMAIN}/resetPassword?t=${token}">Reset Password</a>
        </div>`
		const data = {
            to: email,
			from: process.env.EMAIL_FROM,
			subject: "Reset Password Link",
            text: "Please follow the instructions: ",
			html,
		};

        return sgMail.send(data);
	}
}

export default new ForgotService();
