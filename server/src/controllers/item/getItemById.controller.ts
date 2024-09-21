import { Request, Response } from "express";
import { Item } from "../../entities/item";
import { getItemByIdService } from "../../services";

const getItemById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const item: Item = await getItemByIdService(id);

	res.status(200).json(item);
};

export default getItemById;
