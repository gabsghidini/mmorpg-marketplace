import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import { AppError } from "../../errors";
import * as i from "../../interfaces/item";

/**
 * Updates an item by its ID with the provided item data.
 *
 * @param {string} itemId - The ID of the item to be updated.
 * @param {Item} itemData - The new data for the item.
 * @returns {Promise<i.Item>} - A promise that resolves to the updated item.
 * @throws {AppError} - Throws an error if the item is not found.
 */
const updateItemByIdService = async (
	itemId: string,
	itemData: Item
): Promise<i.Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const item = await itemRepository.findOneBy({
		id: itemId,
	});

	if (!item) {
		throw new AppError("Item not found", 404);
	}

	const itemUpdated: i.Item = await itemRepository.create({
		...item,
		...itemData,
	});

	await itemRepository.save(itemUpdated);

	return itemUpdated;
};

export default updateItemByIdService;
