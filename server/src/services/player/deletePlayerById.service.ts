import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const deletePlayerByIdService = async (player_id: string): Promise<void> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOneBy({
		id: player_id,
	});

	await playerRepository.delete(player);

	return;
};

export default deletePlayerByIdService;
