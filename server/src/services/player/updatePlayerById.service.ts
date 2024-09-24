import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const updatePlayerByIdService = async (
	playerId: string,
	gold: number
): Promise<i.Player> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOneBy({
		id: playerId,
	});

	const playerUpdated: i.Player = await playerRepository.create({
		...player,
		gold,
	});

	await playerRepository.save(playerUpdated);

	return playerUpdated;
};

export default updatePlayerByIdService;
