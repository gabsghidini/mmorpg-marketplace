import { Inventory } from "./inventory";
import { Offer } from "./offer";

export interface Item {
	id: string;
	name: string;
	inventory: Inventory[];
	offers: Offer[];
}
