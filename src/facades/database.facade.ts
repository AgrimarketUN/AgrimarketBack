import bcryptjs from "bcryptjs";

import Product from "@/models/product";
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

	async getProducts(): Promise<any> {
		const query = await Product.findAll();
		return query;
	}

	async createProduct(
		nombre_producto: any,
		descripcion_producto: any,
		precio: any,
		imagen_producto: any,
		categoria: any,
		origen: any,
		fecha_cosecha: any,
		fecha_caducidad: any,
		cantidad_disponible: any,
		unidad_medida: any,
		peso_por_unidad: any,
		metodo_cultivo: any,
		certificaciones_organicas: any
	): Promise<any> {
		const product = await Product.create({
			nombre_producto: nombre_producto,
			descripcion_producto: descripcion_producto,
			precio: precio,
			imagen_producto: imagen_producto,
			categoria: categoria,
			origen: origen,
			fecha_cosecha: fecha_cosecha,
			fecha_caducidad: fecha_caducidad,
			cantidad_disponible: cantidad_disponible,
			unidad_medida: unidad_medida,
			peso_por_unidad: peso_por_unidad,
			metodo_cultivo: metodo_cultivo,
			certificaciones_organicas: certificaciones_organicas,
		});
		return product;
	}
}

export default new DatabaseFacade();
