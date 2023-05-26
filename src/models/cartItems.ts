import { DataTypes, Model, Optional } from "sequelize";

import db from "@/db/connection";
import Product from "@/models/product";
import User from "@/models/users";

interface CartItemAttributes {
	id: number;
	quantity: number;
	productId: number;
	userId: number;
}

export type CartItemInput = Optional<CartItemAttributes, "id">;

export type CartItemOutput = Required<CartItemAttributes>;

class CartItem extends Model<CartItemAttributes, CartItemInput> implements CartItemAttributes {
	public id!: number;
	public quantity!: number;
	public productId!: number;
	public userId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

CartItem.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		quantity: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		productId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: "products",
				key: "id",
			},
		},
		userId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: "users",
				key: "id",
			},
		},
	},
	{
		tableName: "cartItems",
		sequelize: db,
		paranoid: true,
	}
);

User.hasMany(CartItem, { foreignKey: "userId" });
CartItem.belongsTo(User, { foreignKey: "userId" });
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

export default CartItem;
