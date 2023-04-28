import { DataTypes, Model } from "sequelize";

import db from "@/db/connection";
import sequelize from "@/db/connection";
import Product from "@/models/product";
import User from "@/models/users";

interface ReviewAttributes {
	id: number;
	text?: string;
	rating: number;
	date: Date;
	productId: number;
	userId: number;
	state: boolean;
}

export type ReviewInput = Omit<ReviewAttributes, "id" | "state" | "text" | "date" >;

export type ReviewOutput = Required<ReviewAttributes>;

class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes {
	public id!: number;
	public text!: string;
	public rating!: number;
	public date!: Date;
	public productId!: number;
	public userId!: number;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Review.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		rating: {
			type: DataTypes.ENUM("1", "2", "3", "4", "5"),
			allowNull: false,
			validate: {
				isIn: [["1", "2", "3", "4", "5"]],
			},
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			validate: {
				isDate: true,
			},
		},
		productId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: Product,
				key: "id",
			},
		},
		userId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: User,
				key: "id",
			},
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "reviews",
		sequelize: db,
	}
);

Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(Product, { foreignKey: "productId" });

(async () => {
	await sequelize.sync();
	console.log("Tabla review creada");
})();

export default Review;
