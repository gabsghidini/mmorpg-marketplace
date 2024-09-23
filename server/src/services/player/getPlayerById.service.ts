import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const getPlayerByIdService = async (player_id: string): Promise<i.Player> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOne({
		where: { id: player_id },
		relations: ["inventory", "offers"],
	});

	return player;
};

export default getPlayerByIdService;
