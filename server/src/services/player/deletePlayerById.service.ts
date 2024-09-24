import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

/**
 * Deletes a player by their ID.
 *
 * @param playerId - The ID of the player to be deleted.
 * @returns A promise that resolves when the player has been deleted.
 */
const deletePlayerByIdService = async (playerId: string): Promise<void> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOneBy({
		id: playerId,
	});

	await playerRepository.delete(player);

	return;
};

export default deletePlayerByIdService;
