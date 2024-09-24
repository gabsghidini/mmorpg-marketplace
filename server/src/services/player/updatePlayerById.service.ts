import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";
import * as i from "../../interfaces/player";

/**
 * Updates the gold amount of a player by their ID.
 *
 * @param playerId - The ID of the player to update.
 * @param gold - The new amount of gold for the player.
 * @returns A promise that resolves to the updated player object.
 * @throws {AppError} If the player with the given ID is not found.
 */
const updatePlayerByIdService = async (
	playerId: string,
	gold: number
): Promise<i.Player> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOneBy({
		id: playerId,
	});

	if (!player) {
		throw new AppError("Player not found", 404);
	}

	const playerUpdated: i.Player = await playerRepository.create({
		...player,
		gold,
	});

	await playerRepository.save(playerUpdated);

	return playerUpdated;
};

export default updatePlayerByIdService;
