import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";
import { AppError } from "../../errors";

/**
 * Creates a new item in the marketplace. If the item already exists, an error is thrown.
 *
 * @param item - The item object containing the details of the item to be created.
 * @returns A promise that resolves to the newly created item.
 * @throws {AppError} If the item name is not provided or if the item already exists.
 */
const createNewItemService = async (item: i.Item): Promise<Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	if (!item.name) {
		throw new AppError("Item name is required", 400);
	}

	const existingItem = await itemRepository.findOne({
		where: { name: item.name },
	});
	if (existingItem) {
		throw new AppError("Item already exists", 403);
	}

	const newItem = itemRepository.create(item);

	await itemRepository.save(newItem);

	return newItem;
};

export default createNewItemService;
