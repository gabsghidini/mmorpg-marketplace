interface Player {
	nickname: string;
	id?: number;
}

export const player1: Player = {
	nickname: "gabsghidini",
};

export const player2: Player = {
	nickname: "eevee",
};

export const healthPotion: Item = {
	name: "Health Potion",
};

export const manaPotion: Item = {
	name: "Mana Potion",
};

export const sword: Item = {
	name: "Sword",
};

export const shield: Item = {
	name: "Shield",
};

export const offerBuy: Offer = {
	playerId: player1.id,
	itemId: healthPotion.id,
	quantity: 1,
	pricePerUnit: 5,
	type: "buy",
	endDate: "2024-09-27",
};

export const offerSell: Offer = {
	playerId: player2.id,
	itemId: healthPotion.id,
	quantity: 1,
	pricePerUnit: 5,
	type: "sell",
	endDate: "2024-09-27",
};

export const addItemToSellPlayer = {
	itemId: healthPotion.id,
	quantity: 5,
};

export interface Item {
	id?: string;
	name: string;
}

export interface Offer {
	id?: string;
	playerId: number;
	itemId: string;
	quantity: number;
	pricePerUnit: number;
	type: "buy" | "sell";
	endDate: string;
}
