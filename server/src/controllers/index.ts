/* PLAYER */
import createNewPlayer from "./player/createNewPlayer.controller";
import getAllPlayers from "./player/getAllPlayers.controller";
import getPlayerById from "./player/getPlayerById.controller";
import updatePlayerById from "./player/updatePlayerById.controller";
import deletePlayerById from "./player/deletePlayerById.controller";

/* ITEM */
import createNewItem from "./item/createNewItem.controller";
import getAllItems from "./item/getAllItems.controller";
import getItemById from "./item/getItemById.controller";
import updateItemById from "./item/updateItemById.controller";
import deleteItemById from "./item/deleteItemById.controller";

/* OFFER */
import createNewOffer from "./offer/createNewOffer.controller";
import getAllOffers from "./offer/getAllOffers.controller";
import getOfferById from "./offer/getOfferById.controller";
import updateOfferById from "./offer/updateOfferById.controller";
import deleteOfferById from "./offer/deleteOfferById.controller";

/* INVENTORY */
import addItemToPlayer from "./inventory/addItemToPlayer.controller";

export {
	createNewPlayer,
	getAllPlayers,
	getPlayerById,
	updatePlayerById,
	deletePlayerById,
	createNewItem,
	getAllItems,
	getItemById,
	updateItemById,
	deleteItemById,
	createNewOffer,
	getAllOffers,
	getOfferById,
	updateOfferById,
	deleteOfferById,
	addItemToPlayer,
};
