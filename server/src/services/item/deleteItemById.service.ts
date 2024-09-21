import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";

const deleteItemByIdService = async (item_id: string): Promise<i.Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const item = await itemRepository.findOneBy({
		id: item_id,
	});

	await itemRepository.delete(item);

	return item;
};

export default deleteItemByIdService;
