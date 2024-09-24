import AppDataSource from "../../data-source";
import { Inventory } from "../../entities/inventory";
import { Item } from "../../entities/item";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

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
