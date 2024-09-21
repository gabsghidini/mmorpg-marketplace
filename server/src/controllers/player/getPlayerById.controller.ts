import { Request, Response } from "express";
import { Player } from "../../entities/player";
import { getPlayerByIdService } from "../../services";

const getPlayerById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;

	const player: Player = await getPlayerByIdService(id);

	return res.status(200).json(player);
};

export default getPlayerById;
