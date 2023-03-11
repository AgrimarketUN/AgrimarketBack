import bcryptjs from "bcryptjs";

function hashear(string: string) {
	const salt = bcryptjs.genSaltSync();
	return bcryptjs.hashSync(string, salt);
}

export default hashear;
