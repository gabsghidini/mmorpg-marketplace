import { Item } from "./item";
import { Player } from "./player";

export interface Inventory {
	id: string;
	player: Player;
	item: Item;
	quantity: number;
}
