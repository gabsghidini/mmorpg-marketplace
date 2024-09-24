import AppDataSource from "../../data-source";
import { Inventory } from "../../entities/inventory";
import { Offer } from "../../entities/offer";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

/**
 * Fulfills a buy offer by transferring items from the seller to the buyer and handling the gold transaction.
 *
 * @param buyOfferId - The ID of the buy offer to be fulfilled.
 * @param sellerId - The ID of the seller who will fulfill the buy offer.
 * @throws {AppError} If the buy offer is not found.
 * @throws {AppError} If the seller is not found.
 * @throws {AppError} If the seller does not have enough items in their inventory.
 * @returns {Promise<void>} A promise that resolves when the buy offer is successfully fulfilled.
 */
const fulfillBuyOfferService = async (
	buyOfferId: string,
	sellerId: string
): Promise<void> => {
	const offerRepository = AppDataSource.getRepository(Offer);
	const playerRepository = AppDataSource.getRepository(Player);
	const inventoryRepository = AppDataSource.getRepository(Inventory);

	// Encontra a oferta de compra
	const buyOffer = await offerRepository.findOne({
		where: { id: buyOfferId, type: "buy" },
		relations: ["player", "item"],
	});

	if (!buyOffer) {
		throw new AppError("Buy Offer not found", 404);
	}

	// Encontra o vendedor
	const seller = await playerRepository.findOne({ where: { id: sellerId } });
	if (!seller) {
		throw new AppError("Seller not found", 404);
	}

	// Verifica se o vendedor tem itens suficientes no inventário
	const sellerInventory = await inventoryRepository.findOne({
		where: {
			player: { id: seller.id },
			item: { id: buyOffer.item.id },
		},
	});

	if (!sellerInventory || sellerInventory.quantity < buyOffer.quantity) {
		throw new AppError("Not enough items in seller's inventory", 400);
	}

	// Deduz a quantidade de itens do inventário do vendedor
	sellerInventory.quantity -= buyOffer.quantity;

	if (sellerInventory.quantity === 0) {
		await inventoryRepository.remove(sellerInventory);
	} else {
		await inventoryRepository.save(sellerInventory);
	}

	// Transfere o ouro do comprador para o vendedor
	const totalGold = buyOffer.quantity * buyOffer.pricePerUnit;
	buyOffer.player.gold -= totalGold;
	seller.gold += totalGold;

	await playerRepository.save(buyOffer.player);
	await playerRepository.save(seller);

	// Transfere os itens do vendedor para o comprador
	let buyerInventory = await inventoryRepository.findOne({
		where: {
			player: { id: buyOffer.player.id },
			item: { id: buyOffer.item.id },
		},
	});

	if (buyerInventory) {
		buyerInventory.quantity += buyOffer.quantity;
	} else {
		buyerInventory = inventoryRepository.create({
			player: buyOffer.player,
			item: buyOffer.item,
			quantity: buyOffer.quantity,
		});
	}

	await inventoryRepository.save(buyerInventory);

	// Deleta a oferta de compra após o fulfillment
	await offerRepository.remove(buyOffer);
};

export default fulfillBuyOfferService;
