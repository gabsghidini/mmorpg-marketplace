import AppDataSource from "../../data-source";
import { Player } from "../../entities/player";
import * as i from "../../interfaces/player";

const createNewPlayerService = async (payload: i.Player): Promise<i.Player> => {
	const { nickname } = payload;

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
