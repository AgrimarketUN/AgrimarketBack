import { DataTypes, Model, Optional } from "sequelize";

import db from "@/db/connection";

interface UserAttributes {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	address?: string;
	phone?: string;
	isSeller: boolean;
	role: string;
	image?: string;
	state: boolean;
}

export type UserInput = Optional<UserAttributes, "id" | "address" | "phone" | "image" | "state" | "isSeller" | "role">;

export type UserOutput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	public id!: number;
	public firstname!: string;
	public lastname!: string;
	public email!: string;
	public password!: string;
	public address!: string;
	public phone!: string;
	public isSeller!: boolean;
	public role!: string;
	public image!: string;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

User.init(
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
		sequelize: db,
	}
);

export default User;
