import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import { Player } from "../../entities/player";
import { Inventory } from "../../entities/inventory";
import { AppError } from "../../errors";

const fulfillSellOfferService = async (
	sellOfferId: string,
	buyerId: string
): Promise<void> => {
	const offerRepository = AppDataSource.getRepository(Offer);
	const playerRepository = AppDataSource.getRepository(Player);
	const inventoryRepository = AppDataSource.getRepository(Inventory);

	// Encontra a oferta de venda
	const sellOffer = await offerRepository.findOne({
		where: { id: sellOfferId, type: "sell" },
		relations: ["player", "item"],
	});

	if (!sellOffer) {
		throw new AppError("Sell Offer not found", 404);
	}

	// Encontra o comprador
	const buyer = await playerRepository.findOne({ where: { id: buyerId } });
	if (!buyer) {
		throw new AppError("Buyer not found", 404);
	}

	// Verifica se o comprador tem ouro suficiente
	const totalCost = sellOffer.quantity * sellOffer.pricePerUnit;
	if (buyer.gold < totalCost) {
		throw new AppError("Not enough gold", 400);
	}

	// Deduz o ouro do comprador e adiciona ao vendedor
	buyer.gold -= totalCost;
	sellOffer.player.gold += totalCost;

	await playerRepository.save(buyer);
	await playerRepository.save(sellOffer.player);

	// Transfere os itens da oferta para o comprador
	let buyerInventory = await inventoryRepository.findOne({
		where: {
			player: { id: buyer.id },
			item: { id: sellOffer.item.id },
		},
	});

	if (buyerInventory) {
		buyerInventory.quantity += sellOffer.quantity;
	} else {
		buyerInventory = inventoryRepository.create({
			player: buyer,
			item: sellOffer.item,
			quantity: sellOffer.quantity,
		});
	}

	await inventoryRepository.save(buyerInventory);

	// Deleta a oferta de venda após o fulfillment
	await offerRepository.remove(sellOffer);
};

export default fulfillSellOfferService;
