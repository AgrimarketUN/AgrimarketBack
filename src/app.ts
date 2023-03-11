import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import db from "@/db/connection";
import errorMiddleware from "@/middlewares/error.middleware";
import loginRoutes from "@/routes/login.routes";
import registerRoutes from "@/routes/register.routes";

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
		this._app.use("/login", loginRoutes);
		this._app.use("/register", registerRoutes);
		this._app.use(errorMiddleware);
	}

	private initDb() {
		try {
			db.authenticate();
			console.log("Database is connected");
		} catch (error) {
			console.log("Error connecting to database: ", error);
		}
	}

	public get app(): Application {
		return this._app;
	}
}
