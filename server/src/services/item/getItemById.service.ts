import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";

const getItemByIdService = async (item_id: string): Promise<i.Item> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const item = await itemRepository.findOneBy({
		id: item_id,
	});

	return item;
};

export default getItemByIdService;
