import { Request, Response } from "express";
import { Player } from "../../entities/player";
import { createNewPlayerService } from "../../services";

const createNewPlayer = async (req: Request, res: Response) => {
	const newPlayer: Player = await createNewPlayerService(req.body);

	res.status(201).json(newPlayer);
};

export default createNewPlayer;
