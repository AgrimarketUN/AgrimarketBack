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
		certificaciones_organicas: any,
		vendedor: any
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
			vendedor: vendedor,
		});
		return product;
	}

	async findProductBy(type: string, value: string): Promise<any> {
		if (type === "nombre_producto") {
			return await Product.findAll({ where: { nombre_producto: value } });
		} else if (type === "categoria") {
			return await Product.findAll({ where: { categoria: value } });
		} else if (type === "origen") {
			return await Product.findAll({ where: { origen: value } });
		} else if (type === "precio") {
			return await Product.findAll({ where: { precio: value } });
		} else if (type === "descripcion_producto") {
			return await Product.findAll({ where: { descripcion_producto: value } });
		} else if (type === "fecha_cosecha") {
			return await Product.findAll({ where: { fecha_cosecha: value } });
		} else if (type === "fecha_caducidad") {
			return await Product.findAll({ where: { fecha_caducidad: value } });
		} else if (type === "metodo_cultivo") {
			return await Product.findAll({ where: { methodo_cultivo: value } });
		} else if (type === "certificaciones_organicas") {
			return await Product.findAll({ where: { certificaciones_organicas: value } });
		}
	}
}

export default new DatabaseFacade();
