import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

/**
 * Retrieves all offers from the database, including related player information.
 *
 * This service fetches all offers and includes the associated player entity.
 * It then maps the offers to include the player's nickname in the response.
 *
 * @returns {Promise<i.Offer[]>} A promise that resolves to an array of offers with player nicknames.
 */
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
