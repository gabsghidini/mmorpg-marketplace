import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";

/**
 * Deletes an item from the repository by its ID.
 *
 * @param {string} itemId - The ID of the item to be deleted.
 * @returns {Promise<void>} A promise that resolves when the item is deleted.
 */
const deleteItemByIdService = async (itemId: string): Promise<void> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const item = await itemRepository.findOneBy({
		id: itemId,
	});

	await itemRepository.delete(item);

	return;
};

export default deleteItemByIdService;
