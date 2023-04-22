import bcryptjs from "bcryptjs";

import Product from "@/models/product";
import { ProductInput } from "@/models/product";
import User from "@/models/users";

class DatabaseFacade {

	async createUser(firstname: string, lastname: string, email: string, password: string): Promise<boolean> {
		const salt = bcryptjs.genSaltSync();
		await User.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: bcryptjs.hashSync(password, salt),
		});
		return true;
	}

	async compareDB(_email: string, _password: string): Promise<boolean> {
		const query = await User.findOne({ where: { email: _email } });
		if (query === null) {
			console.log("query null");
			return false;
		} else {
			if (bcryptjs.compareSync(_password, query.dataValues.password)) {
				return true;
			} else {
				console.log("password incorrecto");
				return false;
			}
		}
	}

	async getProducts(): Promise<typeof query> {
		const query = await Product.findAll();
		return query;
	}

	async createProduct(payload: ProductInput): Promise< typeof product > {
		const product = await Product.create(payload);
		return product;
	}

	async findProductBy(type: string, value: string): Promise< any > {
		if (type === "name") {
			return await Product.findAll({ where: { name: value } });
		} else if (type === "price") {
			return await Product.findAll({ where: { price: value } });
		} else if (type === "origin") {
			return await Product.findAll({ where: { origin: value } });
		} else if (type === "expiryDate") {
			return await Product.findAll({ where: { expiryDate: value } });
		} else if (type === "harvestDate") {
			return await Product.findAll({ where: { harvestDate: value } });
		} else if (type === "availableQuantity") {
			return await Product.findAll({ where: { availableQuantity: value } });
		} else if (type === "unit") {
			return await Product.findAll({ where: { unit: value } });
		} else if (type === "cultivationMethod") {
			return await Product.findAll({ where: { cultivationMethod: value } });
		} else if (type === "categoryId") {
			return await Product.findAll({ where: { categoryId: value } });
		} else if (type === "storeId") {
			return await Product.findAll({ where: { storeId: value } });
		}
	}
}

export default new DatabaseFacade();
