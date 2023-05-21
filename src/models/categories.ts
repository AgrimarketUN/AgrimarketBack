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

(async () => {
	if ((await Category.count()) > 0) return;
	//id: 0
	await Category.create({
		name: "Frutas",
		description: "Frutos comestibles que se consumen frescos o se utilizan para preparar alimentos. Incluyen manzanas, bananas, naranjas, fresas, arándanos, entre otros.",
	});
	//id: 1
	await Category.create({
		name: "Verduras",
		description: "Plantas comestibles que se consumen frescas o se utilizan para preparar alimentos. Incluyen lechuga, tomate, pepino, espinacas, zanahorias, entre otros.",
	});
	//id: 2
	await Category.create({ name: "Producto animal", description: "Productos derivados de animales que se utilizan como alimento. Incluyen leche, queso, huevos, mantequilla, entre otros." });
	//id: 3
	await Category.create({
		name: "Granos",
		description: "Semillas comestibles que se utilizan como alimento o se procesan para elaborar otros productos. Incluyen arroz, trigo, maíz, avena, entre otros.",
	});
	//id: 4
	await Category.create({
		name: "Tubérculos",
		description:
			"Plantas comestibles que se caracterizan por tener un engrosamiento en la raíz. Se utilizan como alimento y para preparar productos derivados. Incluyen papas, boniatos, yucas, entre otros.",
	});
	console.log("Categorias creadas");
})();

export default Category;
