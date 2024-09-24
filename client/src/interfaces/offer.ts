import { Item } from "./item";
import { Player } from "./player";

export interface Offer {
	id: string;
	player: Player;
	item: Item;
	type: "buy" | "sell";
	quantity: number;
	pricePerUnit: number;
	totalPrice: number;
	endDate: Date;
	playerNickname?: string;
}
