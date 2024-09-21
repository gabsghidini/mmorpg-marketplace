import { Request, Response } from "express";
import { deletePlayerByIdService } from "../../services";

const deletePlayerById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;

	await deletePlayerByIdService(id);

	return res.status(204).send();
};

export default deletePlayerById;
