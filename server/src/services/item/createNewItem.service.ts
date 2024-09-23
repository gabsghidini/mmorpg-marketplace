import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";
import { AppError } from "../../errors";

const createNewItemService = async (item: i.Item): Promise<Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

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
