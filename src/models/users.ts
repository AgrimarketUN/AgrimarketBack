import { DataTypes } from "sequelize";

import db from "@/db/connection";

const User = db.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		correo: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		contrasena: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		direccion: {
			type: DataTypes.STRING(100),
		},
		telefono: {
			type: DataTypes.STRING(20),
		},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		tableName: "users",
	}
);

export default User;
