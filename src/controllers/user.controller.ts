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
					// return only some fields of the user
					user: {
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						address: user.address,
						phone: user.phone,
						image: user.image,
					},
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
					// return only some fields of the user
					user: {
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						address: user.address,
						phone: user.phone,
						image: user.image,
					},
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
