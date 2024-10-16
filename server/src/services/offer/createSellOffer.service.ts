import AppDataSource from "../../data-source";
import { Inventory } from "../../entities/inventory";
import { Item } from "../../entities/item";
import { Offer } from "../../entities/offer";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

/**
 * Creates a sell offer for a player.
 *
 * @param playerId - The ID of the player creating the sell offer.
 * @param itemId - The ID of the item to be sold.
 * @param quantity - The quantity of the item to be sold.
 * @param pricePerUnit - The price per unit of the item.
 * @param endDate - The end date of the sell offer.
 * @returns A promise that resolves to the created Offer.
 * @throws {AppError} If the player is not found.
 * @throws {AppError} If the item is not found.
 * @throws {AppError} If the player does not have enough items in inventory.
 */
const createSellOfferService = async (
	playerId: string,
	itemId: string,
	quantity: number,
	pricePerUnit: number,
	endDate: Date
): Promise<Offer> => {
	const playerRepository = AppDataSource.getRepository(Player);
	const itemRepository = AppDataSource.getRepository(Item);
	const inventoryRepository = AppDataSource.getRepository(Inventory);
	const offerRepository = AppDataSource.getRepository(Offer);

	// Verifica se o jogador existe
	const player = await playerRepository.findOne({
		where: { id: playerId },
		relations: ["inventory"],
	});

	if (!player) {
		throw new AppError("Player not found", 404);
	}

	// Verifica se o item existe
	const item = await itemRepository.findOneBy({ id: itemId });
	if (!item) {
		throw new AppError("Item not found", 404);
	}

	// Verifica se o jogador tem itens suficientes no inventário
	const inventory = await inventoryRepository.findOne({
		where: {
			player: { id: playerId },
			item: { id: itemId },
		},
	});

	if (!inventory || inventory.quantity < quantity) {
		throw new AppError("Not enough items in inventory", 400);
	}

	// Deduz a quantidade de itens do inventário
	inventory.quantity -= quantity;

	if (inventory.quantity === 0) {
		await inventoryRepository.remove(inventory);
	} else {
		await inventoryRepository.save(inventory);
	}

	// Calcula o valor total da oferta
	const totalPrice = quantity * pricePerUnit;

	// Cria a oferta de venda
	const offer = offerRepository.create({
		player: player,
		item: item,
		quantity: quantity,
		pricePerUnit: pricePerUnit,
		totalPrice: totalPrice,
		type: "sell",
		endDate: endDate,
	});

	// Salva a oferta
	await offerRepository.save(offer);

	return offer;
};

export default createSellOfferService;
