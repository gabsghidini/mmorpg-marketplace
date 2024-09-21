import { Request, Response } from "express";
import { deleteItemByIdService } from "../../services";

const deleteItemById = async (req: Request, res: Response) => {
	const { id } = req.params;

	await deleteItemByIdService(id);

	res.status(204).send();
};

export default deleteItemById;
