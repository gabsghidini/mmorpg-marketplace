import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

/**
 * Retrieves an offer by its ID.
 *
 * @param {string} offerId - The ID of the offer to retrieve.
 * @returns {Promise<i.Offer>} A promise that resolves to the offer object.
 */
const getOfferByIdService = async (offerId: string): Promise<i.Offer> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offer = await offerRepository.findOneBy({
		id: offerId,
	});

	return offer;
};

export default getOfferByIdService;
