import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import { Offer } from "../../entities/offer";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

/**
 * Creates a buy offer for a player.
 *
 * @param playerId - The ID of the player creating the buy offer.
 * @param itemId - The ID of the item to be bought.
 * @param quantity - The quantity of the item to be bought.
 * @param pricePerUnit - The price per unit of the item.
 * @param endDate - The end date of the buy offer.
 * @returns A promise that resolves to the created Offer.
 * @throws {AppError} If the player is not found.
 * @throws {AppError} If the item is not found.
 * @throws {AppError} If the player does not have enough gold.
 */
const createBuyOfferService = async (
	playerId: string,
	itemId: string,
	quantity: number,
	pricePerUnit: number,
	endDate: Date
): Promise<Offer> => {
	const playerRepository = AppDataSource.getRepository(Player);
	const itemRepository = AppDataSource.getRepository(Item);
	const offerRepository = AppDataSource.getRepository(Offer);

	// Verifica se o jogador existe
	const player = await playerRepository.findOneBy({ id: playerId });

	if (!player) {
		throw new AppError("Player not found", 404);
	}

	// Verifica se o item existe
	const item = await itemRepository.findOneBy({ id: itemId });
	if (!item) {
		throw new AppError("Item not found", 404);
	}

	// Calcula o valor total da oferta
	const totalPrice = quantity * pricePerUnit;

	// Verifica se o jogador tem gold suficiente
	if (player.gold < totalPrice) {
		throw new AppError("Not enough gold", 400);
	}

	// Deduz o gold do jogador
	player.gold -= totalPrice;
	await playerRepository.save(player);

	// Cria a oferta de compra
	const offer = offerRepository.create({
		player: player,
		item: item,
		quantity: quantity,
		pricePerUnit: pricePerUnit,
		totalPrice: totalPrice,
		type: "buy",
		endDate: endDate,
	});

	// Salva a oferta
	await offerRepository.save(offer);

	return offer;
};

export default createBuyOfferService;
