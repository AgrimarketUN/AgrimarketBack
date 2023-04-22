import { DataTypes } from "sequelize";

import db from "@/db/connection";
import User from "@/models/users";

const Store = db.define(
	"Store",
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		adress: {
			type: DataTypes.STRING(50),
		},
		userId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: User,
				key: "id",
			},
		},
		Image: {
			type: DataTypes.STRING(255),
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "stores",
	}
);

Store.belongsTo(User, { foreignKey: "userId" });

export default Store;
