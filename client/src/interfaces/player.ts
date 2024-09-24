import { Inventory } from "./inventory";
import { Item } from "./item";
import { Offer } from "./offer";

export interface Player {
	id: string | null;
	nickname: string;
	gold: number | 0;
	inventory: Inventory[] | [];
	offers: Offer[] | [];
}

export interface GeneralContext {
	player: Player;
	setPlayer: React.Dispatch<React.SetStateAction<Player>>;
	playerList: Player[];
	getAllPlayers: () => Promise<void>;
	getPlayerById: (id: string) => Promise<void>;
	impersonatePlayer: (id: string) => Promise<void>;
	getAllItems: () => Promise<void>;
	itemList: Item[];
	offerList: Offer[];
	createOffer: (offer: Offer, playerId: string) => Promise<void>;
}
