import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import { AppError } from "../../errors";
import * as i from "../../interfaces/player";

const createNewPlayerService = async (payload: i.Player): Promise<i.Player> => {
	const { nickname } = payload;

	if (!nickname) {
		throw new AppError("Nickname is required", 400);
	}

	const playerRepository = AppDataSource.getRepository(Player);

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
