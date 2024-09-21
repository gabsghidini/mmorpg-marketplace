import { Request, Response } from "express";
import { Player } from "../../entities/player";
import { updatePlayerByIdService } from "../../services";

const updatePlayerById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;
	const { gold } = req.body;

	const player: Player = await updatePlayerByIdService(id, gold);

	return res.status(200).json(player);
};

export default updatePlayerById;
