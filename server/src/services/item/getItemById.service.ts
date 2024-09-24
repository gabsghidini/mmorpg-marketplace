import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import { AppError } from "../../errors";
import * as i from "../../interfaces/item";

/**
 * Retrieves an item by its ID from the database.
 *
 * @param {string} itemId - The unique identifier of the item to be retrieved.
 * @returns {Promise<i.Item>} A promise that resolves to the item object if found.
 * @throws {AppError} Throws an error if the item is not found.
 */
const getItemByIdService = async (itemId: string): Promise<i.Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const item = await itemRepository.findOneBy({
		id: itemId,
	});

	if (!item) {
		throw new AppError("Item not found", 404);
	}
	return item;
};

export default getItemByIdService;
