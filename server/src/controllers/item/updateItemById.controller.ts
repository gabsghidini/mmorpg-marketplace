import { Request, Response } from "express";
import { Item } from "../../entities/item";
import { updateItemByIdService } from "../../services";

const updateItemById = async (req: Request, res: Response) => {
	const item_id = req.params.id;
	const item = req.body as Item;

	const updatedItem = await updateItemByIdService(item_id, item);

	res.status(200).json(updatedItem);
};

export default updateItemById;
