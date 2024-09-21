import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const updatePlayerByIdService = async (
	player_id: string,
	gold: number
): Promise<i.Player> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOneBy({
		id: player_id,
	});

	const playerUpdated: i.Player = await playerRepository.create({
		...player,
		gold,
	});

	await playerRepository.save(playerUpdated);

	return playerUpdated;
};

export default updatePlayerByIdService;
