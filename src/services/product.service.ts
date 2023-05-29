import jwt, { JwtPayload } from "jsonwebtoken";

import databaseFacade from "@/facades/database.facade";
import { ProductInput, ProductOutput } from "@/models/product";

class ProductService {
	async createProduct(token: string, payload: ProductInput): Promise<ProductOutput> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		if ((await databaseFacade.getisSeller(decoded.email)) === false) {
			throw new Error("You are not a seller");
		}
		payload.storeId = (await databaseFacade.getMyStore(decoded.email)).id;
		const product = await databaseFacade.createProduct(payload);
		return product;
	}

	async updateProduct(token: string, payload: ProductInput, product_id: string): Promise<ProductOutput> {
		token = token.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
		const decode_id = (await databaseFacade.findEmail(decoded.email)).id;
		if ((await databaseFacade.haveThisStore(decoded.email, product_id)) === false) {
			throw new Error("You are not the owner of this product");
		}
		payload.storeId = decode_id;
		const product = await databaseFacade.updateProduct(payload, product_id);
		return product;
	}

	async deleteProduct(token: string, product_id: string): Promise<ProductOutput> {
		token = token.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
		if ((await databaseFacade.haveThisStore(decoded.email, product_id)) === false) {
			throw new Error("You are not the owner of this product");
		}
		const query = await databaseFacade.deleteProduct(product_id);
		return query;
	}

	async getProductsSeller(token: string): Promise<ProductOutput[]> {
		token = token.split(" ")[1];
		const decoded = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		const email = decoded.email;
		const query = await databaseFacade.getProductsSeller(email);
		return query;
	}
}

export default new ProductService();