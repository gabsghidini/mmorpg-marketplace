import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const getPlayerByIdService = async (playerId: string): Promise<i.Player> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOne({
		where: { id: playerId },
		relations: ["inventory", "offers"],
	});

	return player;
};

export default getPlayerByIdService;
