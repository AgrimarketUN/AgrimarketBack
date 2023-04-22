import { DataTypes, ModelDefined, Optional } from "sequelize";

import db from "@/db/connection";
import Category from "@/models/categories";
import Store from "@/models/stores";

interface ProductAttributes {
	id: number;
	name: string,
	description?: string,
	price: number,
	image?: string,
	origin?: string,
	expiryDate?: Date,
	harvestDate?: Date,
	availableQuantity?: number,
	unit?: string,
	weight?: number,
	cultivationMethod?: string,
	organicCertifications?: string,
	categoryId: number,
	storeId: number,
}

export type ProductInput = Optional<
	ProductAttributes,
	'id' | 'description' | 'image' | 'origin' | 'expiryDate' | 
	'harvestDate' | 'unit' | 'weight' | 'cultivationMethod' |
	'organicCertifications'>

export type ProductOutput = Required<ProductAttributes>

const Product: ModelDefined<
	ProductAttributes,
	ProductInput> = db.define(
	"Product",
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
			type: DataTypes.STRING(255),
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
	}
);

Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Store, { foreignKey: "storeId" });

export default Product;
