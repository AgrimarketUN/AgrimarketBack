export type CartGet = {
	[key: string]: { quantity: number; availableQuantity: number; name: string; price: number; unit: string; image: string; expiryDate: Date };
};
