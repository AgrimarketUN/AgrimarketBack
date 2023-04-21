import { DataTypes } from "sequelize";

import db from "@/db/connection";
import sequelize from "@/db/connection";
import Product from "@/models/product";
import User from "@/models/users";

const Review = db.define(
	"Review",
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
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
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
	}
);

Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(Product, { foreignKey: "productId" });

(async () => {
	await sequelize.sync();
	console.log("Tabla review creada");
})();

export default Review;
