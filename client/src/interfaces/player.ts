import { Inventory } from "./inventory";
import { Offer } from "./offer";

export interface Player {
	id: string | null;
	nickname: string;
	gold: number | 0;
	inventory: Inventory[] | [];
	offers: Offer[] | [];
}

export interface PlayerContext {
	player: Player;
	setPlayer: React.Dispatch<React.SetStateAction<Player>>;
	playerList: Player[];
	getAllPlayers: () => Promise<void>;
}
