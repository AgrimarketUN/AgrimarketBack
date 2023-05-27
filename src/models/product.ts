import { DataTypes, Model, Optional } from "sequelize";

import db from "@/db/connection";
import Category from "@/models/categories";
import Store from "@/models/stores";

interface ProductAttributes {
	id: number;
	name: string;
	description?: string;
	price: number;
	image?: string;
	origin?: string;
	expiryDate?: Date;
	harvestDate?: Date;
	availableQuantity?: number;
	unit?: string;
	weight?: number;
	cultivationMethod?: string;
	organicCertifications?: string;
	categoryId: number;
	storeId: number;
	state: boolean;
}

export type ProductInput = Optional<
	ProductAttributes,
	"id" | "description" | "image" | "origin" | "expiryDate" | "harvestDate" | "unit" | "weight" | "cultivationMethod" | "organicCertifications" | "storeId" | "state"
>;

export type ProductOutput = Required<ProductAttributes>;

class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
	public id!: number;
	public name!: string;
	public description!: string;
	public price!: number;
	public image!: string;
	public origin!: string;
	public expiryDate!: Date;
	public harvestDate!: Date;
	public availableQuantity!: number;
	public unit!: string;
	public weight!: number;
	public cultivationMethod!: string;
	public organicCertifications!: string;
	public categoryId!: number;
	public storeId!: number;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Product.init(
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
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING(255),
		},
		origin: {
			type: DataTypes.STRING(255),
		},
		expiryDate: {
			type: DataTypes.DATE,
		},
		harvestDate: {
			type: DataTypes.DATE,
		},
		availableQuantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		unit: {
			type: DataTypes.ENUM("Kg", "Lb", "Cubeta", "L"),
			allowNull: false,
			validate: {
				isIn: [["Kg", "Lb", "Cubeta", "L"]],
			},
		},
		weight: {
			type: DataTypes.DECIMAL(10, 2),
		},
		cultivationMethod: {
			type: DataTypes.STRING(255),
		},
		organicCertifications: {
			type: DataTypes.TEXT,
		},
		categoryId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: Category,
				key: "id",
			},
		},
		storeId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: Store,
				key: "id",
			},
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "products",
		sequelize: db,
	}
);

Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Store, { foreignKey: "storeId" });

export default Product;
