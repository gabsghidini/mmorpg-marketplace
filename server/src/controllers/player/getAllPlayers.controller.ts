import { Request, Response } from "express";
import { Player } from "../../entities/player";
import { getAllPlayersService } from "../../services";

const getAllPlayers = async (req: Request, res: Response) => {
	const players: Player[] = await getAllPlayersService();

	res.status(200).json(players);
};

export default getAllPlayers;
