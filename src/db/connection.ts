import { Sequelize } from "sequelize";

// argumentos: (nombre de la base de datos, usuario, contraseña, opciones)
const sequelize = new Sequelize("usuarios", "jbautistas", "jbautistas", {
	host: "usuarios.cfzdcgaflyxp.us-east-1.rds.amazonaws.com",
	dialect: "mysql",
	logging: false,
});

export default sequelize;
