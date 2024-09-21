import AppDataSource from "../../data-source";
import { Item } from "../../entities/item";
import * as i from "../../interfaces/item";

const getAllItemsService = async (): Promise<i.Item[]> => {
	const itemRepository = AppDataSource.getRepository(Item);

	const items = await itemRepository.find();

	return items;
};

export default getAllItemsService;
