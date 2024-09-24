import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";
import * as i from "../../interfaces/player";

/**
 * Service to create a new player.
 *
 * @param payload - The player data containing the nickname.
 * @returns A promise that resolves to the created player.
 * @throws {AppError} If the nickname is not provided.
 */
const createNewPlayerService = async (payload: i.Player): Promise<i.Player> => {
	const { nickname } = payload;

	if (!nickname) {
		throw new AppError("Nickname is required", 400);
	}

	const playerRepository = AppDataSource.getRepository(Player);

	const foundPlayer = await playerRepository.findOneBy({
		nickname: nickname,
	});

	if (foundPlayer) {
		throw new AppError("Nickname already in use", 409);
	}
	const player = playerRepository.create({
		nickname,
		gold: 0,
		inventory: [],
		offers: [],
	});

	await playerRepository.save(player);

	return player;
};

export default createNewPlayerService;
