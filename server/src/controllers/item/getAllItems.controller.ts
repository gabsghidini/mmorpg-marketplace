import { Request, Response } from "express";
import { Item } from "../../entities/item";
import { getAllItemsService } from "../../services";

const getAllItems = async (req: Request, res: Response) => {
	const items: Item[] = await getAllItemsService();

	res.status(200).json(items);
};

export default getAllItems;
