import { Request, Response } from "express";
import { Item } from "../../entities/item";
import { createNewItemService } from "../../services";

const createNewItem = async (req: Request, res: Response) => {
	const item: Item = await createNewItemService(req.body);

	res.status(201).json(item);
};

export default createNewItem;
