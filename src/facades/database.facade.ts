import bcryptjs from "bcryptjs";

import Product from "@/models/product";
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

	async getProducts(): Promise<any> {
		const query = await Product.findAll();
		return query;
	}

	async createProduct(
		name: string,
		description: string,
		price: number,
		image: string,
		origin: string,
		expiryDate: Date,
		harvestDate: Date,
		availableQuantity: number,
		unit: string,
		weight: number,
		cultivationMethod: string,
		organicCertifications: string,
		categoryId: number,
		storeId: number,
	): Promise<any> {
		const product = await Product.create({
			name:  name,
			description: description,
			price: price,
			image: image,
			origin: origin,
			expiryDate: expiryDate,
			harvestDate: harvestDate,
			availableQuantity: availableQuantity,
			unit: unit,
			weight: weight,
			cultivationMethod: cultivationMethod,
			organicCertifications: organicCertifications,
			categoryId: categoryId,
			storeId: storeId,
		}

		);
		return product;
	}

	async findProductBy(type: string, value: string): Promise<any> {
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
