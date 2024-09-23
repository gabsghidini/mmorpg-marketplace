import AppDataSource from "../../data-source";
import { Inventory } from "../../entities/inventory";
import { Item } from "../../entities/item";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";

const addItemToPlayerService = async (
	playerId: string,
	itemId: string,
	quantity: number
): Promise<Inventory> => {
	const playerRepository = AppDataSource.getRepository(Player);
	const itemRepository = AppDataSource.getRepository(Item);
	const inventoryRepository = AppDataSource.getRepository(Inventory);

	// Verifica se o jogador existe
	const player = await playerRepository.findOneBy({ id: playerId });
	if (!player) {
		throw new AppError({ message: "Player not found", code: 404 });
	}

	// Verifica se o item existe
	const item = await itemRepository.findOneBy({ id: itemId });
	if (!item) {
		throw new Error("Item not found");
	}

	// Verifica se o jogador já possui o item no inventário
	let inventory = await inventoryRepository.findOne({
		where: {
			player: player,
			item: item,
		},
	});

	if (inventory) {
		// Se o item já está no inventário, apenas atualiza a quantidade
		inventory.quantity += quantity;
	} else {
		// Se o item não está no inventário, cria um novo registro
		inventory = inventoryRepository.create({
			player: player,
			item: item,
			quantity: quantity,
		});
	}

	// Salva o inventário atualizado
	await inventoryRepository.save(inventory);

	return inventory;
};

export default addItemToPlayerService;
