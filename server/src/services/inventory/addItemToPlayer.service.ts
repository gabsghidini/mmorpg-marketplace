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
		relations: ["inventory"],
	});

	if (!player) {
		throw new AppError({ message: "Player not found", code: 404 });
	}

	const item = await itemRepository.findOneBy({ id: itemId });
	if (!item) {
		throw new Error("Item not found");
	}

	let inventory = await inventoryRepository.findOne({
		where: {
			player: player,
			item: item,
		},
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

	return player;
};

export default addItemToPlayerService;
