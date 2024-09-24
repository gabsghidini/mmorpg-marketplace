import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

const getAllOffersService = async (): Promise<i.Offer[]> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	// Inclui a relação com o jogador (player) ao buscar as ofertas
	const offers = await offerRepository.find({
		relations: ["player"], // Carrega a relação com a entidade Player
	});

	// Mapeia as ofertas para incluir o nickname do player
	const offersWithPlayerNickname = offers.map((offer) => ({
		...offer,
		playerNickname: offer.player.nickname, // Adiciona o nickname do player à resposta
	}));

	return offersWithPlayerNickname;
};

export default getAllOffersService;
