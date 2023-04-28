import { DataTypes, Model } from "sequelize";

import db from "@/db/connection";
import sequelize from "@/db/connection";
import Product from "@/models/product";
import User from "@/models/users";

interface OrderAttributes {
	id: number;
	date: Date;
	quantity: number;
	productId: number;
	userId: number;
	state: boolean;
}

export type OrderInput = Omit<OrderAttributes, "id" | "state">;

export type OrderOutput = Required<OrderAttributes>;

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
	public id!: number;
	public date!: Date;
	public quantity!: number;
	public productId!: number;
	public userId!: number;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Order.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
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
		tableName: "orders",
		sequelize: db,
	}
);

Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Product, { foreignKey: "productId" });

(async () => {
	await sequelize.sync();
	console.log("Tabla order creada");
})();

export default Order;
