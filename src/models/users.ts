import { DataTypes } from "sequelize";

import db from "@/db/connection";

const User = db.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		firstname: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(100),
		},
		phone: {
			type: DataTypes.STRING(20),
		},
		isSeller: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		role: {
			type: DataTypes.ENUM("admin", "user"),
			defaultValue: "user",
			validate: {
				isIn: [["admin", "user"]],
			},
		},
		image: {
			type: DataTypes.STRING(255),
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "users",
	}
);

export default User;
