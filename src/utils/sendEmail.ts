import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 2525,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const send_email = (to: string, subject: string, html: string) => {
	return transporter.sendMail({
		from: process.env.EMAIL_FROM,
		to: to,
		subject: subject,
		html: html,
	});
};

export default send_email;
