import bcryptjs from "bcryptjs";

import User from "@/models/users";

class DatabaseFacade {
	//User creation in the DB
	async createUser(nombre: string, apellido: string, correo: string, contrasena: string, direccion: string, telefono: string): Promise<boolean> {
		const salt = bcryptjs.genSaltSync();
		const usuario = await User.create({
			nombre: nombre,
			apellido: apellido,
			correo: correo,
			contrasena: bcryptjs.hashSync(contrasena, salt),
			direccion: direccion,
			telefono: telefono,
		});
		return true;
	}

	//Data verify in the DB
	async compareDB(_correo: string, _contrasena: string): Promise<boolean> {
		const query = await User.findOne({ where: { correo: _correo } });
		if (query === null) {
			return false;
		} else {
			if (bcryptjs.compareSync(_contrasena, query.dataValues.contrasena)) {
				return true;
			} else {
				return false;
			}
		}
	}
}

export default new DatabaseFacade();
