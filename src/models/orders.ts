import { DataTypes } from "sequelize";

import db from "@/db/connection";
import sequelize from "@/db/connection";
import Product from "@/models/product";
import User from "@/models/users";

const Order = db.define(
	"Order",
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
	}
);

Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Product, { foreignKey: "productId" });

(async () => {
	await sequelize.sync();
	console.log("Tabla order creada");
})();

export default Order;
