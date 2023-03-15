import { DataTypes } from "sequelize";

import db from "@/db/connection";

const Product = db.define(
	"Product",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre_producto: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		descripcion_producto: {
			type: DataTypes.TEXT,
		},
		precio: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		imagen_producto: {
			type: DataTypes.STRING(255),
		},
		categoria: {
			type: DataTypes.STRING(255),
		},
		origen: {
			type: DataTypes.STRING(255),
		},
		fecha_cosecha: {
			type: DataTypes.DATE,
		},
		fecha_caducidad: {
			type: DataTypes.DATE,
		},
		cantidad_disponible: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		unidad_medida: {
			type: DataTypes.STRING(255),
		},
		peso_por_unidad: {
			type: DataTypes.DECIMAL(10, 2),
		},
		metodo_cultivo: {
			type: DataTypes.STRING(255),
		},
		certificaciones_organicas: {
			type: DataTypes.TEXT,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		tableName: "products",
	}
);

export default Product;
