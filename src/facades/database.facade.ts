import bcryptjs from "bcryptjs";
import { Op } from "sequelize";

import Product, { ProductOutput } from "@/models/product";
import { ProductInput } from "@/models/product";
import User, { UserInput, UserOutput } from "@/models/users";

class DatabaseFacade {
	async createUser(payload: UserInput): Promise<UserOutput> {
		const query = await User.findOne({ where: { email: payload.email } });
		if (query === null) {
			const salt = bcryptjs.genSaltSync();
			payload.password = bcryptjs.hashSync(payload.password, salt);
			const user = await User.create(payload);
			return user;
		} else {
			throw new Error("User already exists");
		}
	}

	/*async updatePass(value: string, pass: string): Promise<boolean> {
		const query = await User.findOne({ where: { email: value } }).then(User.getAttributes);
		const salt = bcryptjs.genSaltSync();

		query. = pass
		return true;
	}*/

	async compareDB(_email: string, _password: string): Promise<boolean> {
		const query = await User.findOne({ where: { email: _email } });
		if (query === null) {
			return false;
		} else {
			if (bcryptjs.compareSync(_password, query.dataValues.password)) {
				return true;
			} else {
				console.log("Password incorrecto");
				return false;
			}
		}
	}

	async getProducts(): Promise<Product[]> {
		const query = await Product.findAll();
		return query;
	}

	async createProduct(payload: ProductInput): Promise<ProductOutput> {
		const product = await Product.create(payload);
		return product;
	}

	async updateProduct(payload: ProductInput, id: string): Promise<ProductOutput> {
		const product = await Product.findByPk(id);
		if (!product) {
			throw new Error("Product not found");
		}
		const updateProduct = await product.update(payload);
		return updateProduct;
	}

	async findProductBy(type: string, value: string | Array<number>): Promise<ProductOutput[] | undefined> {
		if (type === "name") {
			return await Product.findAll({ where: { name: { [Op.like]: "%" + value + "%" } } });
		} else if (type === "price") {
			return await Product.findAll({ where: { price: { [Op.between]: [value[0], value[1]] } } });
		} else if (type === "origin") {
			return await Product.findAll({ where: { origin: { [Op.like]: "%" + value + "%" } } });
		} else if (type === "expiryDate") {
			return await Product.findAll({ where: { expiryDate: value } });
		} else if (type === "harvestDate") {
			return await Product.findAll({ where: { harvestDate: value } });
		} else if (type === "availableQuantity") {
			return await Product.findAll({ where: { availableQuantity: value } });
		} else if (type === "unit") {
			return await Product.findAll({ where: { unit: { [Op.like]: "%" + value + "%" } } });
		} else if (type === "cultivationMethod") {
			return await Product.findAll({ where: { cultivationMethod: { [Op.like]: "%" + value + "%" } } });
		} else if (type === "categoryId") {
			return await Product.findAll({ where: { categoryId: value } });
		} else if (type === "storeId") {
			return await Product.findAll({ where: { storeId: value } });
		}
	}

	async deleteProduct(id: string): Promise<number> {
		const deleteProduct = await Product.destroy({ where: { id: id } });
		return deleteProduct;
	}

	async findEmail(value: string): Promise<any> {
		const query = await User.findOne({ where: { email: value } });
		if (query === null) {
			return null;
		} else {
			return query;
		}
	}
}

export default new DatabaseFacade();
