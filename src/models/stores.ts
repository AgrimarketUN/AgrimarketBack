import { DataTypes, Model } from "sequelize";

import db from "@/db/connection";
import User from "@/models/users";

interface StoreAttributes {
	id: number;
	name: string;
	description: string;
	address: string;
	userId?: number;
	Image?: string;
	state: boolean;
}

export type StoreInput = Omit<StoreAttributes, "id" | "state" | "Image">;

export type StoreOutput = Required<StoreAttributes>;

class Store extends Model<StoreAttributes, StoreInput> implements StoreAttributes {
	public id!: number;
	public name!: string;
	public description!: string;
	public address!: string;
	public userId!: number;
	public Image!: string;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Store.init(
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
		address: {
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
		sequelize: db,
	}
);

Store.belongsTo(User, { foreignKey: "userId" });

export default Store;
