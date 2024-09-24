import { Item } from "./item";
import { Player } from "./player";

export interface Inventory {
	id: string;
	player: Player;
	name?: string;
	item: Item;
	quantity: number;
}

export interface ModifiedInventory {
	inventoryId: string | null;
	itemId: string;
	quantity: number;
	itemName: string;
}
