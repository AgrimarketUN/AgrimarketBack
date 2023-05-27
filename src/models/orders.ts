import { DataTypes, Model, Optional } from "sequelize";

import db from "@/db/connection";
import Product from "@/models/product";
import User from "@/models/users";

enum ShippingStatus {
	IN_TRANSIT = "in_transit",
	PENDING_DELIVERY = "pending_delivery",
	DELIVERED = "delivered",
	RETURNED = "returned",
}

interface OrderAttributes {
	id: number;
	date: Date;
	quantity: number;
	productId: number;
	userId: number;
	shippingStatus: ShippingStatus;
	shippingDate?: Date;
	deliveryDate?: Date;
	trackingNumber?: string;
	shippingMethod?: string;
	shippingCost?: number;
	state: boolean;
}

export type OrderInput = Optional<OrderAttributes, "id" | "userId" | "date" | "state" | "shippingStatus" | "shippingDate" | "deliveryDate" | "trackingNumber">;

export type OrderOutput = Required<OrderAttributes>;

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
	public id!: number;
	public date!: Date;
	public quantity!: number;
	public productId!: number;
	public userId!: number;
	public shippingStatus!: ShippingStatus;
	public shippingDate!: Date;
	public deliveryDate!: Date;
	public trackingNumber!: string;
	public shippingMethod!: string;
	public shippingCost!: number;
	public state!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Order.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		quantity: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
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
		shippingStatus: {
			type: DataTypes.ENUM,
			values: Object.values(ShippingStatus),
			defaultValue: ShippingStatus.PENDING_DELIVERY,
		},
		shippingDate: {
			type: DataTypes.DATE,
		},
		deliveryDate: {
			type: DataTypes.DATE,
		},
		trackingNumber: {
			type: DataTypes.STRING,
		},
		shippingMethod: {
			type: DataTypes.STRING,
		},
		shippingCost: {
			type: DataTypes.FLOAT,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "orders",
		sequelize: db,
	}
);

Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Product, { foreignKey: "productId" });

export default Order;
