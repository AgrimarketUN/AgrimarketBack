export type CartGet = {
	[key: string]: { quantity: number; availableQuantity: number; name: string; price: number; image: string; expiryDate: Date };
};
