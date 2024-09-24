import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";
import * as i from "../../interfaces/player";

/**
 * Retrieves a player by their ID from the database.
 *
 * @param playerId - The unique identifier of the player to retrieve.
 * @returns A promise that resolves to the player object, including their inventory and offers.
 * @throws {AppError} If the player is not found.
 */
const getPlayerByIdService = async (playerId: string): Promise<i.Player> => {
	const playerRepository = AppDataSource.getRepository(Player);

	const player = await playerRepository.findOne({
		where: { id: playerId },
		relations: ["inventory", "inventory.item", "offers"],
	});

	if (!player) {
		throw new AppError("Player not found", 404);
	}

	return player;
};

export default getPlayerByIdService;
