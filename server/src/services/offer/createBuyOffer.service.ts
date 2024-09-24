import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import { Offer } from "../../entities/offer";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

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
