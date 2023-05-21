import bcryptjs from "bcryptjs";
import { Op } from "sequelize";

import Order, { OrderInput, OrderOutput } from "@/models/orders";
import Product, { ProductInput, ProductOutput } from "@/models/product";
import Review, { ReviewOutput } from "@/models/reviews";
import Store, { StoreInput, StoreOutput } from "@/models/stores";
import User, { UserInput, UserOutput } from "@/models/users";

class DatabaseFacade {
	// User

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

	async updatePassword(value: string, pass: string): Promise<UserOutput> {
		const user = await this.findEmail(value);
		const salt = bcryptjs.genSaltSync();
		await User.update(
			{ password: bcryptjs.hashSync(pass, salt) },
			{
				where: {
					email: value,
				},
			}
		);
		return user;
	}

	async compareDB(_email: string, _password: string): Promise<UserOutput> {
		const user = await User.findOne({ where: { email: _email } });
		if (user == null) {
			throw new Error("Invalid email");
		} else {
			if (!bcryptjs.compareSync(_password, user.dataValues.password)) {
				throw new Error("Invalid password");
			} else {
				return user;
			}
		}
	}

	async findEmail(value: string): Promise<UserOutput> {
		const user = await User.findOne({ where: { email: value } });
		if (user != null) {
			return user;
		} else {
			throw new Error("User not found");
		}
	}

	async findUser(value: string): Promise<UserOutput> {
		const user = await User.findOne({ where: { id: value } });
		if (user != null) {
			return user;
		} else {
			throw new Error("User not found");
		}
	}

	async getUserRole(value: string): Promise<string> {
		const user = await User.findOne({ where: { email: value } });
		if (user != null) {
			return user.dataValues.role;
		} else {
			throw new Error("User not found");
		}
	}

	async updateUser(payload: UserInput, id: string): Promise<UserOutput> {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error("User not found");
		}
		const updateUser = await user.update(payload);
		return updateUser;
	}

	// Store

	async createStore(payload: StoreInput): Promise<StoreOutput> {
		const query = await Store.findOne({ where: { name: payload.name } });
		const query2 = await Store.findOne({ where: { userId: payload.userId } });
		if (query2 != null) {
			throw new Error("User already has a store");
		} else if (query != null) {
			throw new Error("Store already exists");
		} else {
			const store = await Store.create(payload);
			return store;
		}
	}

	async getStores(): Promise<StoreOutput[]> {
		const store = await Store.findAll({ include: User });
		return store;
	}

	// Product

	async getProducts(): Promise<Product[]> {
		const query = await Product.findAll({ where: { state: true } });
		return query;
	}

	async getProduct(id: string): Promise<ProductOutput> {
		// Return product with id also return product with false state
		const query = await Product.findByPk(id);
		if (!query) {
			throw new Error("Product not found");
		}
		return query;
	}

	async createProduct(payload: ProductInput): Promise<ProductOutput> {
		const product = await Product.create(payload);
		return product;
	}

	async updateProductQuantity(payload: number, id: string): Promise<ProductOutput> {
		const product = await Product.findByPk(id);
		if (!product) {
			throw new Error("Product not found");
		}
		const updateProduct = await product.update({ availableQuantity: payload });
		if (updateProduct.availableQuantity === 0) {
			await product.update({ state: false });
		}
		return updateProduct;
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
			return await Product.findAll({ where: { name: { [Op.like]: "%" + value + "%" }, state: true } });
		} else if (type === "price") {
			return await Product.findAll({ where: { price: { [Op.between]: [value[0], value[1]] }, state: true } });
		} else if (type === "origin") {
			return await Product.findAll({ where: { origin: { [Op.like]: "%" + value + "%" }, state: true } });
		} else if (type === "expiryDate") {
			return await Product.findAll({ where: { expiryDate: value, state: true } });
		} else if (type === "harvestDate") {
			return await Product.findAll({ where: { harvestDate: value, state: true } });
		} else if (type === "availableQuantity") {
			return await Product.findAll({ where: { availableQuantity: value, state: true } });
		} else if (type === "unit") {
			return await Product.findAll({ where: { unit: { [Op.like]: "%" + value + "%" }, state: true } });
		} else if (type === "cultivationMethod") {
			return await Product.findAll({ where: { cultivationMethod: { [Op.like]: "%" + value + "%" }, state: true } });
		} else if (type === "categoryId") {
			return await Product.findAll({ where: { categoryId: value, state: true } });
		} else if (type === "storeId") {
			return await Product.findAll({ where: { storeId: value, state: true } });
		}
	}

	async deleteProduct(id: string): Promise<ProductOutput> {
		const product = await Product.findByPk(id);
		if (!product) {
			throw new Error("Product not found");
		}
		const query = await product.update({ state: false });
		return query;
	}

	// Order

	async getOrders(): Promise<Order[]> {
		const order = await Order.findAll();
		return order;
	}

	async buyProduct(payload: OrderInput): Promise<OrderOutput> {
		const order = await Order.create(payload);
		return order;
	}

	// Reviews

	async getReviews(id: string): Promise<ReviewOutput[]> {
		const review = await Review.findAll({ where: { productId: id } });
		return review;
	}
}

export default new DatabaseFacade();
