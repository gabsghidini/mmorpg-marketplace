import AppDataSource from "../../data-source";
import { Inventory } from "../../entities/inventory";
import { Item } from "../../entities/item";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

/**
 * Adds an item to a player's inventory. If the item already exists in the player's inventory,
 * the quantity is increased by the specified amount. If the item does not exist, it is added
 * to the inventory with the specified quantity.
 *
 * @param playerId - The ID of the player to whom the item will be added.
 * @param itemId - The ID of the item to be added to the player's inventory.
 * @param quantity - The quantity of the item to be added.
 * @returns A promise that resolves to the updated player object.
 * @throws {AppError} If the player or item is not found.
 */
const addItemToPlayerService = async (
	playerId: string,
	itemId: string,
	quantity: number
): Promise<Player> => {
	const playerRepository = AppDataSource.getRepository(Player);
	const itemRepository = AppDataSource.getRepository(Item);
	const inventoryRepository = AppDataSource.getRepository(Inventory);

	const player = await playerRepository.findOne({
		where: { id: playerId },
		relations: ["inventory", "inventory.item"],
	});

	if (!player) {
		throw new AppError({ message: "Player not found", code: 404 });
	}

	const item = await itemRepository.findOneBy({ id: itemId });
	if (!item) {
		throw new AppError("Item not found", 404);
	}

	let inventory = await inventoryRepository.findOne({
		where: {
			player: player,
			item: item,
		},
		relations: ["item"],
	});

	if (inventory) {
		inventory.quantity += quantity;
	} else {
		inventory = inventoryRepository.create({
			player: player,
			item: item,
			quantity: quantity,
		});
	}

	await inventoryRepository.save(inventory);

	const updatedPlayer = await playerRepository.findOne({
		where: { id: playerId },
		relations: ["inventory", "inventory.item"],
	});

	return updatedPlayer!;
};

export default addItemToPlayerService;
