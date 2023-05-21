import { Request, Response } from "express";

import databaseFacade from "@/facades/database.facade";
import { UserInput } from "@/models/users";
import userService from "@/services/user.service"
import { STATUS_CODES } from "@/utils/constants";

class UserController {
	async updateUser(req: Request, res: Response): Promise<void> {
		try {
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
			const user = await databaseFacade.updateUser(payload, req.params.id);
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
            const id = req.params.id as string;
			await userService.userProfile(id);
        } catch(error){
			res.json({
				error: (error as Error).message,
			})
			.status(STATUS_CODES.BAD_REQUEST)
        }
	}
}

export default new UserController();
