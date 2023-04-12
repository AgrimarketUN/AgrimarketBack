import { Sequelize } from "sequelize";

const db_name: string = <string>process.env.DATABASE_NAME;
const user: string = <string>process.env.DATABASE_USER;
const pswd: string = <string>process.env.DATABASE_PASSWORD;
// argumentos: (nombre de la base de datos, usuario, contraseña, opciones)
const sequelize = new Sequelize(db_name, user, pswd, {
	host: "13.59.72.215",
	dialect: "mysql",
	logging: false,
});

export default sequelize;
