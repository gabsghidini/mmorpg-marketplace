import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";

const updateItemByIdService = async (
	item_id: string,
	itemData: Item
): Promise<i.Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const item = await itemRepository.findOneBy({
		id: item_id,
	});

	const itemUpdated: i.Item = await itemRepository.create({
		...item,
		...itemData,
	});

	await itemRepository.save(itemUpdated);

	return itemUpdated;
};

export default updateItemByIdService;
