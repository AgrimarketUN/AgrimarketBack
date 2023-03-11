import { Sequelize } from "sequelize";

// argumentos: (nombre de la base de datos, usuario, contraseña, opciones)
const sequelize = new Sequelize("pruebas", "root", "12345", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
});

export default sequelize;
