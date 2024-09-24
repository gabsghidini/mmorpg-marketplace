import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

/**
 * Deletes an offer by its ID.
 *
 * @param offerId - The ID of the offer to be deleted.
 * @returns A promise that resolves when the offer is deleted.
 */
const deleteOfferByIdService = async (offerId: string): Promise<void> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offer = await offerRepository.findOneBy({
		id: offerId,
	});

	await offerRepository.delete(offer);

	return;
};

export default deleteOfferByIdService;
