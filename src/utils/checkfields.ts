function checkRequiredFields(requiredFields: string[], requestBody: any): void {
	const missingFields: string[] = [];

	for (const field of requiredFields) {
		if (!requestBody[field]) {
			missingFields.push(field);
		}
	}

	if (missingFields.length > 0) {
		throw new Error(`The following fields are required: ${missingFields.join(", ")}`);
	}
}

export default checkRequiredFields;
