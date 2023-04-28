import { DataTypes, Model } from "sequelize";

import db from "@/db/connection";

interface CategoryAttributes {
	id: number;
	name: string;
	description?: string;
	state: boolean;
}

export type CategoryInput = Omit<CategoryAttributes, "id" | "state">;

export type CategoryOutput = Required<CategoryAttributes>;

class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
	public id!: number;
	public name!: string;
	public description!: string;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Category.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "categories",
		sequelize: db,
	}
);

export default Category;
