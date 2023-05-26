import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import db from "@/db/connection";
import errorMiddleware from "@/middlewares/error.middleware";
import CartItem from "@/models/cartItems";
import Category from "@/models/categories";
import Order from "@/models/orders";
import Product from "@/models/product";
import Review from "@/models/reviews";
import Store from "@/models/stores";
import User from "@/models/users";
import cartRoutes from "@/routes/cart.routes";
import forgotRoutes from "@/routes/forgotPass.routes";
import orderRoutes from "@/routes/order.routes";
import productRoutes from "@/routes/product.routes";
import reviewRoutes from "@/routes/review.routes";
import signRoutes from "@/routes/sign.routes";
import storeRoutes from "@/routes/store.routes";
import userRoutes from "@/routes/user.routes";

export class App {
	private readonly _app: Application;

	constructor() {
		this._app = express();
		this.initMiddlewares();
		this.initDb();
	}

	private initMiddlewares() {
		this._app.use(cors());
		this._app.use(helmet());
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: true }));
		this._app.use("/sign", signRoutes);
		this._app.use("/order", orderRoutes);
		this._app.use("/product", productRoutes);
		this._app.use("/forgot", forgotRoutes);
		this._app.use("/store", storeRoutes);
		this._app.use("/user", userRoutes);
		this._app.use("/review", reviewRoutes);
		this._app.use("/cart", cartRoutes);
		this._app.use(errorMiddleware);
	}

	private initDb() {
		try {
			db.authenticate();
			console.log("Database is connected");
			User.sync();
			Category.sync();
			Product.sync();
			Store.sync();
			Order.sync();
			Review.sync();
			CartItem.sync();
			console.log("Models are synchronize");
		} catch (error) {
			console.log("Error connecting to database: ", error);
		}
	}

	public get app(): Application {
		return this._app;
	}
}
