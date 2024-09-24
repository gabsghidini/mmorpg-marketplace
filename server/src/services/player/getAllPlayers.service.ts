import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

/**
 * Retrieves all players from the database, including their inventory and offers.
 *
 * @returns {Promise<i.Player[]>} A promise that resolves to an array of players.
 */
const getAllPlayersService = async (): Promise<i.Player[]> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const players = await playerRepository.find({
		relations: ["inventory", "offers"],
	});

	return players;
};

export default getAllPlayersService;
