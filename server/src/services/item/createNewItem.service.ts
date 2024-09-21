import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";

const createNewItemService = async (item: i.Item): Promise<Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const newItem = itemRepository.create(item);

	await itemRepository.save(newItem);

	return newItem;
};

export default createNewItemService;
