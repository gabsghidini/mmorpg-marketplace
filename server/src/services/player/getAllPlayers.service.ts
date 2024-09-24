import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const getAllPlayersService = async (): Promise<i.Player[]> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const players = await playerRepository.find({
		relations: ["inventory", "offers"],
	});

	return players;
};

export default getAllPlayersService;
