import { Request, Response } from "express";

import { UserInput } from "@/models/users";
import userService from "@/services/user.service";
import { STATUS_CODES } from "@/utils/constants";

class UserController {
	async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization;
			const payload: UserInput = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
				address: req.body.address,
				phone: req.body.phone,
				image: req.body.image,
				state: req.body.state,
			};
			const user = await userService.updateUser(token as string, payload);
			res
				.json({
					user,
					msg: "User Updated",
				})
				.status(STATUS_CODES.CREATED);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.INTERNAL_ERROR);
		}
	}

	async profileUser(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization;
			const user = await userService.userProfile(token as string);
			res
				.json({
					user,
					msg: "User retrieved successfully",
				})
				.status(STATUS_CODES.OK);
		} catch (error) {
			res
				.json({
					error: (error as Error).message,
				})
				.status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new UserController();
